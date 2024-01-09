import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { LuCross } from "react-icons/lu";
import { HiMiniMagnifyingGlassPlus, HiMiniMagnifyingGlassMinus, HiOutlinePlus } from 'react-icons/hi2';
import { RxCross2 } from 'react-icons/rx';
const Modal = () => {
    const { modalPopped, setModalPopped } = useContext(AuthContext);
    const closePopUp = () => {
        setModalPopped(false);
        document.body.style.overflow = modalPopped ? 'auto' : 'hidden';
    };
    return (
        <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 flex items-center justify-center w-screen h-screen ${modalPopped ? " opacity-100 " : "opacity-0"}  `}>
            <div className="bg-white shadow-xl shadow-zyv-prim1/20 border-gray-300 border-4 relative rounded-2xl overflow-hidden max-w-5xl w-full   ">
                {/* <div
                    className=" absolute top-4 right-4 flex items-center justify-center bg-gray-500 p-2 rounded-lg text-white cursor-pointer"
                >
                    <button onClick={closePopUp}>
                        <HiMiniMagnifyingGlassPlus className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                    </button>
                    <button onClick={closePopUp}>
                        <HiMiniMagnifyingGlassMinus className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                    </button>
                    <button onClick={closePopUp}>
                        <HiOutlinePlus className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rotate-45" />
                    </button>
                </div> */}
                <div className="p-2 cursor-grab  ">
                    {/* Image */}
                    <TransformWrapper
                    >
                        {({ zoomIn, zoomOut }) => (
                            <>
                                <div className=" absolute top-2 right-2 flex items-center justify-center z-30 bg-gray-600 text-white rounded-lg p-1 space-x-2 ">
                                    <button onClick={() => zoomIn()}>
                                        <HiMiniMagnifyingGlassPlus className="w-5 h-5 sm:h-6 sm:w-6 md:w-7 md:h-7 lg:w-8 lg:h-8    " />
                                    </button>
                                    <button onClick={() => zoomOut()}>
                                        <HiMiniMagnifyingGlassMinus className="w-5 h-5 sm:h-6 sm:w-6 md:w-7 md:h-7 lg:w-8 lg:h-8    " />
                                    </button>
                                    <button onClick={() => closePopUp()}>
                                        <RxCross2 className="w-5 h-5 sm:h-6 sm:w-6 md:w-7 md:h-7 lg:w-8 lg:h-8    " />
                                    </button>
                                </div>
                                <TransformComponent>
                                    <img src={modalPopped} className="w-full h-full rounded-lg" />
                                </TransformComponent>
                            </>
                        )}
                    </TransformWrapper>
                </div>
            </div>
        </div>
    )
}

export default Modal