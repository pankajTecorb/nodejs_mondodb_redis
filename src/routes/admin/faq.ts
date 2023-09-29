// import StatusCodes from 'http-status-codes';
// import { Request, Response, Router } from 'express';

// import faqController from '@controllers/admin/faq';
// import schemaValidator from '@utils/schemaValidator';
// import { faqSchema } from "@validators/admin";
// import { verifyAuthToken, checkRole } from "@utils/authValidator";
// import { string } from 'joi';



// // Constants
// const router = Router();
// const { CREATED, OK } = StatusCodes;

// // Paths
// export const p = {
//     register: '/add',
//     update: '/:id/edit',
//     list: '/list',
//     catDetail: '/detail/:id',
//     delete: '/delete',
//     status: '/status/:id'
// } as const;

// /****  Add****/
// router.post(p.register, verifyAuthToken, schemaValidator(faqSchema), async (req: Request, res: Response) => {
//     const data = await faqController.registerFaq(req.body);
//     return res.status(CREATED).send({ data, code: CREATED })
// });
// //**** Edit****/
// router.put(p.update, verifyAuthToken, schemaValidator(faqSchema), async (req: Request, res: Response) => {
//     const data = await faqController.editFaq(req.body, req.params.id);
//     return res.status(OK).send({ data, code: OK })
// });

// //****List****/
// router.get(p.list, verifyAuthToken, async (req: Request, res: Response) => {
//     const data = await faqController.getFaq(req.query);
//     return res.status(OK).send({ data, code: OK })
// });

// //***** Detail**** */
// router.get(p.catDetail, verifyAuthToken, async (req: Request, res: Response) => {
//     const data = await faqController.faqProfile(req.params.id);
//     return res.status(OK).send({ data, code: OK })
// })

// //******** delete********* */

// router.post(p.delete, verifyAuthToken, async (req: Request, res: Response) => {
//     const data = await faqController.deleteFaq(req.body);
//     return res.status(OK).send({ data, code: OK })
// });

// //******** Status change**** */
// router.put(p.status, verifyAuthToken, async (req: Request, res: Response) => {
//     const data = await faqController.statusFaq(req.body, req.params.id);
//     return res.status(OK).send({ data, code: OK })
// });


// // Export default
// export default router;
