import ModalCreateRoom from "../modal/modal-create-room";
import ModalLogin from "../modal/modal-login";
import ModalRegister from "../modal/modal-register";

export default function ModalProvider() {


    return (
        <>
            <ModalLogin />
            <ModalRegister />
            <ModalCreateRoom />
        </>
    )

}