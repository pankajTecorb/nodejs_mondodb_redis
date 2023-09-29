import { userModel ,categoryModel} from '@models/index';
import mongoose from 'mongoose';
import { CustomError } from '@utils/errors';
import StatusCodes from 'http-status-codes';
import { messages } from "@Custom_message";

/**
 * Admin Category Module 
 * 
 * @param body 
 * @returns 
 */

//***********Add Category*********/

function addCategory(body: any, file: any, header: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { language } = header;
            var message: any = messages(language);
            const nameLower = body.lower_name.toLowerCase().trim();
           const catData: any = await categoryModel.findOne({ lower_name:nameLower});
            if (catData) {
                reject(new CustomError(message.alreadyExist, StatusCodes.BAD_REQUEST))
            } else {
                if (file) {
                    body = {
                        ...body,
                        image: file.path
                    }
                }
                const catSave: any = await categoryModel.create(body);
                resolve(catSave)
            }
        } catch (err) {
            reject(err)
        }
    });
}




//***********Edit Category*********/

function editCategory(body: any, file: any, header: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { language } = header;
            var message: any = messages(language);
            var id = new mongoose.Types.ObjectId(body.userId)
            const catData: any = await categoryModel.findOne({ _id: id });
            if (!catData) {
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST))
            } else {
                if (file) {
                    body = {
                        ...body,
                        image: file.path
                    }
                }
                const catObj = await categoryModel.updateOne({ _id: id }, body, { new: true });
                resolve(catObj)
            }
        } catch (err) {
            reject(err)
        }
    });
}

//****Categories List****/

function getCategory(body: any, header: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { language } = header;
            var message: any = messages(language);
            const { page = 1, pageSize = 10, search, fromDate, toDate } = body;
            let condition: any = {
                isDelete: false, role: "user"
            }
            if (search && search != '' && fromDate && toDate) {
                condition = {
                    ...condition,
                    $or: [
                        { name: { $regex: search, $options: 'i' } },
                        { email: { $regex: search, $options: 'i' } },
                        { phoneNumber: { $regex: search, $options: 'i' } },

                    ],
                    createdAt: { $gte: fromDate, $lte: toDate }
                }
            } else if (fromDate && toDate) {
                condition = {
                    ...condition,

                    createdAt: { $gte: fromDate, $lte: toDate }
                }
            }
            if (search && search != '') {
                condition = {
                    ...condition,
                    $or: [
                        { name: { $regex: search, $options: 'i' } },
                        { email: { $regex: search, $options: 'i' } },
                        { phoneNumber: { $regex: search, $options: 'i' } },
                    ]
                }
            }
            const catCounts: any = await categoryModel.aggregate([
                {
                    $addFields: {
                        id: { $toString: "$_id" },
                        objectId: { $toObjectId: "$_id" }
                    }
                },
                { $match: { role: "user", isDelete: false } },
                { $sort: { createdAt: -1 } }

            ])

            const response: any = await categoryModel.find(condition).skip(Number(page - 1) * Number(pageSize))
                .limit(Number(pageSize)).sort({ createdAt: -1 })
            const Total = await categoryModel.count(condition)

            if (!response) {
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST))
            } else {
                resolve({ response, Total, catCounts })
            }
        } catch (err) {
            reject(err)

        }
    });
}





//****Category Detail By Id*****/

function detailCategory(userId: string, header: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { language } = header;
            var message: any = messages(language);
            const response = await categoryModel.findOne({ "_id": userId })
            if (!response) {
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST))
            } else {
                resolve(response)
            }
        } catch (err) {
            reject(err)

        }
    });
}

//***** Delete *****/

function deleteCategory(body: any, catId: Object, header: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { language } = header;
            var message: any = messages(language);
            const { catId } = body
            const catData: any = await categoryModel.findOne({ _id: catId });
            if (!catData) {
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST))
            } else {
                const editdata = {
                    ...body,
                    isDelete: true
                }
                const catObj = await categoryModel.updateOne({ _id: catId }, editdata, { new: true });
                resolve(catObj)
            }
        } catch (err) {
            reject(err)
        }
    });
}

//*********Category Status Change****** */

function statusCategory(body: any, userId: string, header: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { language } = header;
            var message: any = messages(language);
            const { status, userId } = body
            const catData: any = await categoryModel.findOne({ _id: userId });
            if (!catData) {
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST))
            } else {
                const editdata = {
                    ...body,
                    isActive: status
                }
                const catObj = await categoryModel.updateOne({ _id: userId }, editdata, { new: true });
                resolve(catObj)
            }
        } catch (err) {
            reject(err)
        }
    });
}




//****Category List for Excel data Export *****/

function categoriesExcelList(query: any, header: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const { language } = header;
            var message: any = messages(language);
            let condition: any = {
                isDelete: false
                
            }
            let response1 = await categoryModel.find(condition, { name: 1, email: 1, countryCode: 1, phoneNumber: 1, image: 1 }).sort({ createdAt: -1 })
            let response = response1.map(user => {
                // return {
                //     name: user.name ? user.name : "N/A", email: user.email ? user.email : "N/A", countryCode: user.countryCode ? user.countryCode : "N/A", phoneNumber: user.phoneNumber ? user.phoneNumber : "N/A", image: user.image,
                // }
            })
            if (!response) {
                reject(new CustomError(message.noDatafound, StatusCodes.BAD_REQUEST))
            } else {
                resolve(response)
            }
        } catch (err) {
            reject(err)

        }
    });
}



// Export default
export default {
    addCategory,
    editCategory,
    getCategory,
    detailCategory,
    statusCategory,
    deleteCategory,
    categoriesExcelList,
   

} as const;
