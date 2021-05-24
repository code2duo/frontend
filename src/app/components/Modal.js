
import Name from "./Name"
import SelectLang from "./SelectLang"
import { Button } from './Button'
import Cross from "../../icons/Cross"

export default function Modal(){
    return(
        <div className="flex items-center justify-center bg-primary-900  h-screen w-screen inset-0 transparent fixed">
            <button className="fixed top-3 right-3 text-primary-200 md:w-6 md:h-6 w-5 h-5">
                <Cross/>
            </button>
            <div className="flex flex-col bg-primary-800 rounded-lg md:px-5 md:pt-6 pb-7 mx-3  px-3 pt-6">
                <div>
                    <h1 className="text-primary-200 text-3xl text-center md:text-left">
                        Account Details
                    </h1>
                    <p className="text-primary-300 italic">
                        *You can change your preferred language on the editor
                    </p>
                </div>
                
                <div className="flex flex-col space-y-2 mt-2 md:flex-row items-center md:justify-center md:space-x-2 md:space-y-0">
                    <Name Order={"First Name"}/>
                    <Name Order={"Last Name"}/>     
                </div>
                <div className="mt-2">
                    <SelectLang/>
                </div>
                <div className="flex justify-end md:mt-10 md:mb-0 mt-5 mb-7">
                    <Button type="submit" className="py-3 px-6 shadow-outlineLg">Submit</Button>
                </div>
            </div>
        </div>
    )
}