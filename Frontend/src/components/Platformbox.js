import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGamepad } from "@fortawesome/free-solid-svg-icons";

function Platforms(platformName) {
    let xbox = "fa-solid fa-gamepad-modern"
    let ps = "fa-sharp fa-solid fa-gamepad-modern"
    let pc = "fa-solid fa-computer-mouse-scrollwheel"
    return(
        <div className="flex flex-row justify-center bg-slate-600 rounded-3xl m-4">
            <FontAwesomeIcon icon={faGamepad} className="w-10 h-10 pl-2"/>
            <p className="p-2">X-BOX</p>
        </div>
    )
}

export default Platforms;