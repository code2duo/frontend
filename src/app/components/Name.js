

export default function Name({Order}){
    return(
        <div>
            <input type="text" placeholder={Order}
            max="60" className="px-5 py-3 rounded-md bg-primary-600 focus:outline-none text-primary-100 placeholder-primary-300"/>
        </div>
    )
}
