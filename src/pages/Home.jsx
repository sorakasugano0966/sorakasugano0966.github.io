import { useEffect, useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'
import milk from '../assets/bottleofmilk.jpeg'
import logo from '../assets/logo.png'
import { db } from '../firebase'
import { collection, onSnapshot } from 'firebase/firestore'
import { Extra } from '../Components/Extra'

const navigation = [
	{ name: 'About The Milk Company', href: '#about' },
	{ name: 'Our Products', href: '#ourproducts' },
	{
		name: 'Benefits of partnering with The Milk Company',
		href: '#BOPWTMC',
	},
	{ name: 'Contact us', href: '#contactus' },
]

export default function Home() {
	const [val, setVal] = useState([])
	const value = collection(db, 'Product')
	const value2 = collection(db, 'Product2')
	const navigate = useNavigate()
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

	useEffect(() => {
		onSnapshot(
			value,
			snapShot => {
				let dat = []
				snapShot.docs.forEach(doc => {
					dat.push({ ...doc.data(), id: doc.id })
				})
				setVal(dat)
			},
			error => {
				console.log(error)
			}
		)
	}, [])

	return (
		<div className='bg-white'>
			<header className='fixed inset-x-0 top-0 z-10 bg-white' id='home'>
				<nav
					className='flex items-center justify-between p-6 lg:px-8'
					aria-label='Global'
				>
					<div className='flex lg:flex-1'>
						<a href='#home' className='-m-1.5 p-1.5'>
							<span className='sr-only'>Your Company</span>
							<img className='h-8 w-auto' src={logo} alt='' />
						</a>
					</div>
					<div className='flex lg:hidden'>
						<button
							type='button'
							className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700'
							onClick={() => setMobileMenuOpen(true)}
						>
							<span className='sr-only'>Open main menu</span>
							<Bars3Icon className='h-6 w-6' aria-hidden='true' />
						</button>
					</div>
					<div className='hidden lg:flex lg:gap-x-12'>
						{navigation.map(item => (
							<a
								key={item.name}
								href={item.href}
								className='text-sm font-semibold leading-6 text-gray-900'
							>
								{item.name}
							</a>
						))}
					</div>
					<div
						onClick={() => navigate('/signin')}
						className='hidden lg:flex lg:flex-1 lg:justify-end'
					>
						<a
							href='#'
							className='text-sm font-semibold leading-6 text-gray-900'
						>
							Log in <span aria-hidden='true'>&rarr;</span>
						</a>
					</div>
				</nav>
				<Dialog
					as='div'
					className='lg:hidden'
					open={mobileMenuOpen}
					onClose={setMobileMenuOpen}
				>
					<div className='fixed inset-0 z-50' />
					<Dialog.Panel className='fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10'>
						<div className='flex items-center justify-between'>
							<a href='#' className='-m-1.5 p-1.5'>
								<span className='sr-only'>Your Company</span>
								<img className='h-8 w-auto' src={logo} alt='' />
							</a>
							<button
								type='button'
								className='-m-2.5 rounded-md p-2.5 text-gray-700'
								onClick={() => setMobileMenuOpen(false)}
							>
								<span className='sr-only'>Close menu</span>
								<XMarkIcon className='h-6 w-6' aria-hidden='true' />
							</button>
						</div>
						<div className='mt-6 flow-root'>
							<div className='-my-6 divide-y divide-gray-500/10'>
								<div className='space-y-2 py-6'>
									{navigation.map(item => (
										<a
											key={item.name}
											href={item.href}
											className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
										>
											{item.name}
										</a>
									))}
								</div>
								<div className='py-6'>
									<a
										onClick={() => navigate('/signin')}
										href='#'
										className='-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
									>
										Log in
									</a>
								</div>
							</div>
						</div>
					</Dialog.Panel>
				</Dialog>
			</header>

			<div className='relative isolate px-6 pt-14 lg:px-8'>
				<div className='mx-auto max-w-2xl py-32 sm:py-48 lg:py-56'>
					<div className='text-center'>
						<h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl'>
							Data to enrich your online business
						</h1>
						<p className='mt-6 text-lg leading-8 text-gray-600'>
							Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
							lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
							fugiat aliqua.
						</p>
						<div className='mt-10 flex items-center justify-center gap-x-6'>
							<a
								href='#'
								className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
							>
								Learn more <span aria-hidden='true'>→</span>
							</a>
						</div>
					</div>
				</div>
				<div
					className='absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]'
					aria-hidden='true'
				>
					<div
						className='relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]'
						style={{
							clipPath:
								'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
						}}
					/>
				</div>
			</div>
			<div className='about' id='about'>
				<div className='max-w-[1100px] m-auto'>
					<h1 className='text-center text-[20px] mb-[15px]'>About Us</h1>
					<div className='about-menu flex mx-[20px] items-center flex-wrap text-center lg:flex-nowrap'>
						<div className='about-box m-auto'>
							<h3 className='text-black '>Organic Food Products</h3>
							<p className='text-gray-500 text-sm py-2'>
								Lorem ipsum, dolor sit amet consectetur adipisicing elit.
								Repellendus vitae animi voluptate voluptates aperiam.
							</p>
							<h3 className='text-black'>Famous Family Winery</h3>
							<p className='text-gray-500 text-sm py-2'>
								Lorem ipsum, dolor sit amet consectetur adipisicing elit.
								Repellendus vitae animi voluptate voluptates aperiam.
							</p>
							<h3 className='text-black'>Hard Work & Best Quality</h3>
							<p className='text-gray-500 text-sm py-2'>
								Lorem ipsum, dolor sit amet consectetur adipisicing elit.
								Repellendus vitae animi voluptate voluptates aperiam.
							</p>
						</div>
						<div className='about-box m-auto'>
							<img src={milk} alt='' className='max-w-[450px] max-h-[400px]' />
						</div>
						<div className='about-box m-auto'>
							<h3 className='text-black text-'>Natural Ingredients</h3>
							<p className='text-gray-500 text-sm py-2'>
								Lorem ipsum, dolor sit amet consectetur adipisicing elit.
								Repellendus vitae animi voluptate voluptates aperiam.
							</p>
							<h3 className='text-black text-'>Horse Riding</h3>
							<p className='text-gray-500 text-sm py-2'>
								Lorem ipsum, dolor sit amet consectetur adipisicing elit.
								Repellendus vitae animi voluptate voluptates aperiam.
							</p>
							<h3 className='text-black text-'>Organic Food Market</h3>
							<p className='text-gray-500 text-sm py-2'>
								Lorem ipsum, dolor sit amet consectetur adipisicing elit.
								Repellendus vitae animi voluptate voluptates aperiam.
							</p>
						</div>
					</div>
				</div>
			</div>
			<div className='products py-10' id='ourproducts'>
				<div className='max-w-[1100px] m-auto'>
					<div className='products-text text-center'>
						<h1 className='text-[20px] py-4'>Products</h1>
						<p className='text-[14px] mx-[20px] text-center'>
							Our unique specifications have been branded and trademarked.
							Customers and third parties cannot purchase the unique branded
							specifications from <br /> any other potential supplier. This
							exclusive arrangement means that trade secrets and trade terms,
							including pricing, as well as certain product <br /> intrinsics
							remain exclusive to our buyers, giving them a competitive edge.{' '}
						</p>
					</div>
					<div className='products-menu flex m-auto text-center mx-[20px] flex-col lg:flex-row'>
						{val.map(value => {
							return (
								<div
									key={value.id}
									className='products-box max-w-[400px] text-[12px] m-auto'
								>
									{/* {imageList.map(url => {
											return <img src={url} />
										})} */}
									<img src={value.url} className='' alt='' />
									<h2>{value.title}</h2>
									<p>{value.text}</p>
								</div>
							)
						})}
					</div>
					<div className='products-txt'>
						<div className='max-w-[1100px]'>
							<Extra />
						</div>
					</div>
				</div>
			</div>
			<div className='benefits mx-[20px] md:text-[12px]' id='BOPWTMC'>
				<div className='max-w-[1100px] m-auto'>
					<h1 className='text-[30px]'>Benefits of partnering with TMC…</h1>
					<div className='benefits-txt'>
						<h2 className='text-[20px] py-[25px]'>Competitive pricing</h2>
						<p className='text-sm text-gray-500 max-w-[1000px]'>
							TMC is able to achieve very competitive pricing from global milk
							powder suppliers and manufacturers of fat-filled milk powder which
							enables us to sell product to the Customers and third parties at
							competitive prices. TMC purchases thousand of MT of milk powder
							per annum (full cream milk powder and fat filled milk powder) .
							TMC is one of the largest single purchaser of fat-filled milk
							powder in the world, which gives TMC buying power that few players
							in the market can match.
						</p>
					</div>
					<div className='benefits-txt'>
						<h2 className='text-[20px] py-[25px]'>Sourcing and pricing</h2>
						<p className='text-sm text-gray-500 max-w-[1000px]'>
							TMC also provides a regular market analysis of the dairy market to
							its customers (Customers), which includes a forecast of future
							price movements. In order to do this competently TMC has access
							to, and regularly reviews, dairy market information from a variety
							of sources e.g. news, dairy market publications, regular contact
							and discussions with other market players. Key information
							includes global political developments, the evaluation of price
							fluctuations and the current status of global demand and supply,
							including the stock positions of both suppliers and buyers.
						</p>
					</div>
					<div className='benefits-txt'>
						<h2 className='text-[20px] py-[25px]'>Shipment</h2>
						<p className='text-sm text-gray-500 max-w-[1000px]'>
							TMC agrees shipment dates and schedules and places purchase orders
							on the suppliers. Further to this, TMC also monitors shipments
							against the agreed schedules and follows up with suppliers when
							deliveries fall behind schedule. TMC also negotiates better
							freight rates and freight times due to the improved pricing power.
						</p>
					</div>
					<div className='benefits-txt'>
						<h2 className='text-[20px] py-[25px]'>
							Credit financing and stock insurance
						</h2>
						<p className='text-sm text-gray-500 max-w-[1000px]'>
							TMC provides credit terms to Customers and also assists when
							Customers experience liquidity problems, or are not able to source
							USD to pay for goods.* TMC also provides cost effective stock
							throughput insurance.
						</p>
					</div>
					<div className='benefits-txt'>
						<h2 className='text-[20px] py-[25px]'>Quality risk</h2>
						<p className='text-sm text-gray-500 max-w-[1000px]'>
							TMC bears all quality risk in relation to products sold to the
							Customers. In the event of a quality deficiency, TMC with support
							from the R&D team, will liaise with the suppliers to correct any
							quality deficiencies. The suppliers will then compensate TMC, who
							will then pass this on to its customers.” There has not been any
							instance where TMC was not compensated by the suppliers for a
							quality defect.
						</p>
					</div>
				</div>
			</div>
			<footer className='footer my-[60px]' id='contactus'>
				<div className='max-w-[1100px] m-auto'>
					<div className='footer-menu flex justify-around md:flex-row flex-col text-center'>
						<div className='footer-box'>
							<h1>Contact Us</h1>
							<p className='text-sm text-gray-500 my-5'>
								Address: <br /> 3rd Floor, <br /> 2-6 Church Street, <br /> St
								Helier, <br /> Jersey JE2 3NN <br />
								info@themilkcompany.net{' '}
							</p>
							<img src={logo} alt='' className='max-w-[150px] m-auto' />
						</div>
						<div className='footer-box flex flex-col'>
							<label>
								<span className='text-sm text-gray-500'>
									Your Name (required)
								</span>
								<br />
								<input type='text' className='px-5 border-[2px] my-2' />
							</label>
							<label>
								<span className='text-sm text-gray-500'>
									Your Name (required)
								</span>
								<br />
								<input type='text' className='px-5 border-[2px] my-2' />
							</label>
							<label>
								<span className='text-sm text-gray-500'>
									Your Name (required)
								</span>
								<br />
								<input type='text' className='px-5 border-[2px] my-2' />
							</label>
							<label>
								<span className='text-sm text-gray-500'>
									Your Name (required)
								</span>
								<br />
								<textarea type='text' />
							</label>
						</div>
					</div>
				</div>
			</footer>
		</div>
	)
}
