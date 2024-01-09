import Accordion from "../../components/Accordion"
import Footer from "../../components/Footer"
import Header from "../../components/Header"
import Hero from '../../../public/hero-image.png'
const About = () => {
    const faqs = [
        {
            question: "What is DLRC , and how will it help me?",
            answer:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat alias cumque dolore officiis quo impedit, ratione quos at dolorum illo voluptatibus sint natus consequuntur totam veritatis dolores, laborum nemo beatae?",
            isAccordionOpen: false
        },
        {
            question: "Is the Laptop free?",
            answer:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat alias cumque dolore officiis quo impedit, ratione quos at dolorum illo voluptatibus sint natus consequuntur totam veritatis dolores, laborum nemo beatae?",
            isAccordionOpen: false
        },
        {
            question: "Can I use Laptop for non educational purpose?",
            answer:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat alias cumque dolore officiis quo impedit, ratione quos at dolorum illo voluptatibus sint natus consequuntur totam veritatis dolores, laborum nemo beatae?",
            isAccordionOpen: false
        },
        {
            question: "How can I get help regarding the process?",
            answer:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat alias cumque dolore officiis quo impedit, ratione quos at dolorum illo voluptatibus sint natus consequuntur totam veritatis dolores, laborum nemo beatae?",
            isAccordionOpen: false
        }
    ]
    return (
        <div className="flex flex-col w-full min-h-screen bg-white scroll-smooth">
            <Header />
            <main className="flex grow px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24 flex-col justify-center mx-auto items-center max-w-7xl w-full h-full " >
                <div className="flex flex-col items-center space-y-6 sm:space-y-6 justify-center md:justify-between md:flex-row w-full h-full min-h-[85vh]">
                    <div className="w-full h-full md:basis-1/2  " >
                        <img src={Hero} className="w-full h-full -rotate-6 transform -skew-x-12 skew-y-4 " />
                        {/* Green */}
                    </div>
                    <div className="w-full h-full md:basis-[55%] flex flex-col gap-3 items-start justify-center space-y-6" >
                        <div className="flex flex-col items-start justfy-center" >
                            <div className="font-bold italic text-xs ml-2 sm:ml-0" >
                                M.H. Saboo Siddik's
                            </div>
                            <div className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl  text-[#40916c]" >
                                Digital Learning Resource Center
                            </div>
                        </div>
                        <div className="tetx-sm md:text-base" >
                            Apply for the scholarship and avail a laptop for a definite period of time for your college studies
                        </div>
                        <div className="flex items-center justify-start space-x-12 w-full" >
                            <a href="/user/apply" className="p-2 px-4 md:px-6 md:py-3 bg-gradient-to-tr border-2 border-white from-[#52b788] font-bold hover:bg-none hover:border-green-500 hover:border-2 transition-all duration-500 ease-linear to-[#40916c] rounded-xl"  >
                                Apply
                            </a>
                            <a href="/" className="p-2 px-4  md:px-6 md:py-3 border-2 font-bold border-[#40916c] hover:bg-[#40916c] hover:text-white transtion-all ease-linear duration-300 rounded-xl"  >
                                Rules
                            </a>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col  w-full h-full  max-w-4xl mt-8">
                    <div className="flex w-full h-full items-center mb-6 md:mb-8">
                        <h3 className=" w-max font-bold text-[#2d6a4f] text-2xl md:text-3xl mr-3 rounded-md md:self-start " >Interested?</h3>
                        <div className="w-full h-full bg-[#74c69d90] p-1 rounded-sm">‎</div>
                    </div>
                    <p className="text-[0.8rem] sm:text-sm md:text-base" >
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo dolor recusandae, quos magni doloribus deserunt, aut amet officia repellat voluptas temporibus? Error ullam quae asperiores totam atque voluptatibus. Corporis, dolorum.
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo dolor recusandae, quos magni doloribus deserunt, aut amet officia repellat voluptas temporibus? Error ullam quae asperiores totam atque voluptatibus. Corporis, dolorum.
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo dolor recusandae, quos magni doloribus deserunt, aut amet officia repellat voluptas temporibus? Error ullam quae asperiores totam atque voluptatibus. Corporis, dolorum.
                    </p>

                </div>
                <div id="faq" className="flex scroll-mt-[130px] flex-col items-center justify-center mx-auto space-y-5 max-w-4xl mt-20">
                    <div className="flex w-full h-full items-center mb-4 md:mb-6">
                        <div className="w-full h-full bg-[#74c69d90] p-1 rounded-sm">‎</div>
                        <h3 className=" w-max font-bold text-[#2d6a4f] text-2xl md:text-3xl ml-3 rounded-md md:self-end " >FAQs</h3>
                    </div>
                    <div className="flex flex-col gap-4 divide-y-[1.5px]  divide-[#74c69d] p-2 sm:p-6 rounded-xl  ">
                        {faqs.map((d, i) => (
                            <Accordion
                                answer={d.answer}
                                title={d.question}
                                key={i}
                            />
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default About