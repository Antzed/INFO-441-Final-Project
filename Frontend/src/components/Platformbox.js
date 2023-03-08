import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGamepad, faComputerMouse} from "@fortawesome/free-solid-svg-icons";

function Platforms(props) {
    // create a case that  return the corresponding icon based on the platform Name
    function determineIcon(platformName){
        switch(platformName) {
            case "X-BOX":
              return <FontAwesomeIcon icon={faGamepad} className="w-10 h-10 pl-2"/>
            case "PLAYSTATION":
              return <FontAwesomeIcon icon={faGamepad} className="w-10 h-10 pl-2"/>
            case "PC":
              return <FontAwesomeIcon icon={faComputerMouse} className="w-10 h-10 pl-2"/>
            default:
              return <FontAwesomeIcon icon={faGamepad} className="w-10 h-10 pl-2"/>
          }
    }


    

    
    return(
        <div className="flex flex-row justify-center bg-slate-600 rounded-3xl m-4">
            {determineIcon(props.platform)}
           {/* <FontAwesomeIcon icon={faComputerMouse} className="w-10 h-10 pl-2"/> */}
            <p className="p-2">{props.platform}</p>
        </div>
    )
}

export default Platforms;