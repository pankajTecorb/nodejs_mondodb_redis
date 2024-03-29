const jwt = require('jsonwebtoken');
import StatusCodes from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import { userModel, userSessionModel } from '@models/index'
import { errors } from '@constants'
import { object } from 'joi';

const verifyAuthToken = async (req: any, res: Response, next: NextFunction) => {
    const token = req.headers.authorization
    if(!token) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            error: errors.en.noToken,
            message: errors.en.noToken,
            code: StatusCodes.UNAUTHORIZED
        })
    }
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
        if(verified.role == 'Admin') {
            req.user = verified;
            next()
            return
        }
        //Note: Commented signle device login will uncomment before go live
        // const session:any = await userSessionModel.findOne({ jwtToken: token })
        // if(session.status) {
            const user = await userModel.findOne({ _id: verified.id }, { isActive: 1 ,role:1})
            if(user?.isActive) {
                req.user = verified;
                // const token: string = jwt.sign({
                //     id: user.id,
                //     role:user.role,
                //     tokenType: 'access'
                // }, process.env.JWT_SECRET_TOKEN, { expiresIn: '5m' })
                // res.setHeader('accessToken', token);
                next()
            } else {
                return res.status(StatusCodes.UNAUTHORIZED).json({
                    error: errors.en.accountBlocked,
                    message: errors.en.accountBlocked,
                    code: StatusCodes.UNAUTHORIZED
                })
            }
        // } else {
        //     return res.status(StatusCodes.UNAUTHORIZED).json({
        //         error: errors.en.sessionExpired,
        //         message: errors.en.sessionExpired,
        //         code: StatusCodes.UNAUTHORIZED
        //     })
        // }
    } catch(err) {
        if(err.message == "jwt expired") {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                error: errors.en.sessionExpired,
                message: errors.en.sessionExpired,
                code: StatusCodes.UNAUTHORIZED
            })
        }

        return res.status(StatusCodes.UNAUTHORIZED).json({
            error: errors.en.noToken,
            message: errors.en.noToken,
            code: StatusCodes.UNAUTHORIZED
        })
    }
}

const checkRole = (roles: string[]) => {
    return (req: any, res: Response, next: NextFunction) => {
        if(roles.includes(req.user.role))
            next()
        else {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                error: errors.en.unAuthRole,
                code: StatusCodes.UNAUTHORIZED
            })
        }
    }
}
export {
    verifyAuthToken,
    checkRole
}

