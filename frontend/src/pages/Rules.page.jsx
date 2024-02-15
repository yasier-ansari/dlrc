import Header from '../components/Header'
import Footer from '../components/Footer'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import InfoContainer from "@/components/InfoContainer"
import InfoList from "@/components/InfoList"
import InfoListItems from "@/components/InfoListItems"
import { rulesArray } from "@/lib/utils"
import { FaRegHandPointDown } from 'react-icons/fa'
import InfoPageContainer from "@/components/InfoPageContainer"
import NormalText from "@/components/ui/normalText"

const Rules = () => {
	return (
		<div className='flex flex-col w-full min-h-screen bg-white scroll-mt-2 '>
			<Header />
			<main className='flex flex-col min-h-screen relative '>
				<MaxWidthWrapper className='flex-grow flex-1 px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24 flex-col justify-center mx-auto items-center max-w-6xl w-full h-full '>
					<InfoPageContainer
						className={' max-w-6xl '}
						innerClassName={'max-w-4xl'}
						heading={'Rules'} Icon={FaRegHandPointDown}
					>
						<NormalText className={' pb-8 md:pb-12 '}>
							To borrow a laptop, you're required to agree to the
							University&apos;s policies relating to Security,
							Acceptable Use and IT Asset Management.Students who do
							not agree to these policies will not be issued with a
							device. Please note the given rules and regulations
						</NormalText>
						{
							rulesArray?.map((el, idx) => (
								<InfoContainer
									className={'max-w-4xl'}
									title={el?.title}
									key={idx}
								>
									<InfoList key={el?.title} >
										{
											el?.ruleArray?.map((ele, idx) => (
												<InfoListItems key={ele} markerType={idx} >
													{ele}
												</InfoListItems>
											))
										}
									</InfoList>
								</InfoContainer>
							))
						}
					</InfoPageContainer>
				</MaxWidthWrapper>
			</main>
			<Footer />
		</div>
	)
}

export default Rules
