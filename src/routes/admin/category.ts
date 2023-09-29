import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import categoryController from '@controllers/admin/category';
import schemaValidator from '@utils/schemaValidator';
import { signUpSchema ,loginSchema, changePasswordSchema} from "@validators/admin";
import { verifyAuthToken, checkRole } from "@utils/authValidator";
import upload from '@utils/multer';



// Constants
const router = Router();
const { CREATED, OK } = StatusCodes;

// Paths
export const p = {
    add:'/add',
    update: '/edit',
    list: '/list',
    Detail: '/detail/:id',
    delete:'/delete',
    status: '/status/:id',
    exceldata: '/excelData',
   
   
   
} as const;


//**** Add****/
router.post(p.add, verifyAuthToken, upload.single('image'),checkRole(["Admin"]), async (req: any, res: Response) => {
    const data = await categoryController.editCategory(req.body, req.file,req.headers);
    return res.status(OK).send({ data, code: OK })
});

//**** Edit****/
router.put(p.update, verifyAuthToken, upload.single('image'),checkRole(["Admin"]), async (req: any, res: Response) => {
    const data = await categoryController.editCategory(req.body, req.file,req.headers);
    return res.status(OK).send({ data, code: OK })
});
//****  List****/
router.get(p.list, verifyAuthToken,checkRole(["Admin"]), async (req: Request, res: Response) => {
    const data = await categoryController.getCategory(req.query,req.headers);
    return res.status(OK).send({ data, code: OK })
});

//***** Detail**** */
router.get(p.Detail, verifyAuthToken,checkRole(["Admin"]), async (req: Request, res: Response) => {
    const data = await categoryController.detailCategory(req.params.id,req.headers);
    return res.status(OK).send({ data, code: OK })
})

//******** delete********* */

router.post(p.delete,verifyAuthToken,checkRole(["Admin"]), async (req: Request, res: Response) => {
    const data = await categoryController.deleteCategory(req.body,req.params.id,req.headers);
    return res.status(OK).send({ data, code: OK })
});

//********  Status change**** */
router.put(p.status, verifyAuthToken,checkRole(["Admin"]), async (req: Request, res: Response) => {
    const data = await categoryController.statusCategory(req.body, req.params.id,req.headers);
    return res.status(OK).send({ data, code: OK })
});

//**** Categories  Excel data****/
router.get(p.exceldata, async (req: Request, res: Response) => {
    const data = await categoryController.categoriesExcelList(req.query,req.headers);
    return res.status(OK).send({ data, code: OK })
});





// Export default
export default router;
