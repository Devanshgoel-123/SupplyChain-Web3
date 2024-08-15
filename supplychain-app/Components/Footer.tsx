type footerItem={
    name:string
}
export const Footer=()=>{
  const FooterItems=[
    {
        name:"Terms"
    },
    {
        name:"License"
    },
    {
        name:"Privacy"
    },
    {
        name:"About Us"
    }
  ]
  return <>
  <footer className="pt-10">
    <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8 flex flex-row justify-between border-b-2 ">
     <div className="align-center justify-start sm:flex flex-col">
        <div className="space-y-6">
            <img src="images/images.png" className="w-32 "></img>
        </div>
        <p className="max-w-md mt-5">
            Nulla auctor metus vitae balle balle forkfjoenfzornfon3mgfpk doksjfdow eijfoiwjeof epdjweopj
        </p>
        <ul className="flex flex-wrap items-center gap-4 text-sm sm:text-base mt-5">
            {
                FooterItems.map((item:footerItem,index:number)=>{
                  return <li className="text-gray-800 hover:text-gray-500 duration-150">
                    <a key={index} href="#">
                        {item.name}
                    </a>
                    </li>
                })
            }
        </ul>
     </div>
     <div className="mt-6">
        <p className="text-gray-600 font-semibold">Get the App!!</p> 
        <div className="flex items-center gap-3 mt-3 sm:block flex-col">
            <a href="#">
                Footer1
            </a> 
            <a href="#" className="mt-0 block sm:mt-3">
                Footer 1
            </a>   
        </div>
     </div>
    </div>
    <hr className="mx-10 h-1 bg-gray-400 mt-5"></hr>
    <div className="mt-2 py-10 border-t md:text-center">
        <p>@ 2024 Devansh Goel. All Rights Reserved</p>
    </div>
  </footer>
  </>
}