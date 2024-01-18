import { Router } from "express";
import { loginUser, logoutUser, newRefreshToken, registerUser, updateProfile, viewProfile, getMyRequestHistory } from "../controllers/student.controller.js";
import { newRequest } from "../controllers/request.controllers.js";
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { uploadFiles, uploadIdCard } from "../middlewares/s3upload.middleware.js";

const router = Router()

router.route("/register").post(
    upload.single("idCard"),
    uploadIdCard,
    registerUser
)

router.route("/login").post(loginUser)

// ALL ROUTES
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/refresh-token").post(newRefreshToken)
router.route("/update-profile").patch(verifyJWT, updateProfile)
router.route("/profile").get(verifyJWT, viewProfile)
router.route("/request-history").get(verifyJWT, getMyRequestHistory)
router.route("/new-request").post(
    verifyJWT,
    upload.fields([
        {
            name: "parents_Dec",
            maxCount: 1
        },
        {
            name: "students_Dec",
            maxCount: 1
        },
        {
            name: "faculty_Rec",
            maxCount: 1
        },
        {
            name: "pdc",
            maxCount: 1
        }
    ]),
    uploadFiles,
    newRequest
)


export { router }

