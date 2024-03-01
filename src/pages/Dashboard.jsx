import { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { db, storage, auth } from '../firebase'
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage'
import { v4 } from 'uuid'
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDocs,
	onSnapshot,
	updateDoc,
} from 'firebase/firestore'
import { Products } from '../Components/Products'
import { Products2 } from '../Components/Products2'
import ava from '../assets/photo_2024-02-26_18-13-32.jpg'

const user = {
	name: 'Tom Cook',
	email: 'tom@example.com',
	imageUrl:
		'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
	{ name: 'Dashboard', href: '#', current: true },
	{ name: 'Team', href: '#', current: false },
	{ name: 'Projects', href: '#', current: false },
	{ name: 'Calendar', href: '#', current: false },
	{ name: 'Reports', href: '#', current: false },
]
const userNavigation = [{ name: 'Sign out', href: '#' }]

function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

export default function Dashboard() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
	const [title, setTitle] = useState('')
	const [text, setText] = useState('')
	const [url, setUrl] = useState('')
	const [id, setId] = useState('')
	const [val, setVal] = useState([])
	const [imageUpload, setImageUpload] = useState(null)
	const [imageList, setImageList] = useState([])
	const value = collection(db, 'Product')
	const imageListRef = ref(storage, 'images/')
	const [showH, setShowH] = useState(false)
	const [showH2, setShowH2] = useState(false)

	const uploadImage = () => {
		if (imageUpload == null) return
		const imageRef = ref(storage, `images/${imageUpload.name + v4()}`)
		uploadBytes(imageRef, imageUpload).then(snapshot => {
			getDownloadURL(snapshot.ref).then(url => {
				setImageList(prev => [...prev, url])
			})
		})
	}
	useEffect(() => {
		listAll(imageListRef).then(response => {
			response.items.forEach(item => {
				getDownloadURL(item).then(url => {
					setImageList(prev => [...prev, url])
				})
			})
		})
	}, [])

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

	const navigate = useNavigate()
	const handleSignOut = () => {
		signOut(auth)
			.then(() => {
				localStorage.removeItem('user')
				navigate('/signin')
			})
			.catch(err => {
				console.log(err)
			})
	}

	const handleCreate = async () => {
		await addDoc(value, { title: title, text: text, url: url })
		setTitle('')
		setText('')
		setUrl('')
	}

	const handleDelete = async id => {
		const deleteUser = doc(db, 'Product', id)
		await deleteDoc(deleteUser)
	}
	const handleEdit = async (id, url, title, text) => {
		setTitle(title)
		setText(text)
		setUrl(url)
		setId(id)
	}
	const handleUpdate = async () => {
		const updateData = doc(db, 'Product', id)
		await updateDoc(updateData, { text: text, title: title, url: url })
		setText('')
		setTitle('')
		setUrl('')
	}

	return (
		<>
			<div className='min-h-full'>
				<Disclosure as='nav' className='bg-gray-800'>
					{({ open }) => (
						<>
							<div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
								<div className='flex h-16 items-center justify-between'>
									<div className='flex items-center'>
										<div className='flex-shrink-0'>
											<img
												className='h-8 w-20'
												src='https://firebasestorage.googleapis.com/v0/b/my-project-93fb9.appspot.com/o/images%2Flogo.png?alt=media&token=c9e56143-9a16-4040-8990-7c2c652d3169'
												alt='Your Company'
											/>
										</div>
										<div className='hidden md:block'>
											<div className='ml-10 flex items-baseline space-x-4'></div>
										</div>
									</div>
									<div className='hidden md:block'>
										<div className='ml-4 flex items-center md:ml-6'>

											{/* Profile dropdown */}
											<Menu as='div' className='relative ml-3'>
												<div>
													<Menu.Button className='relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
														<span className='absolute -inset-1.5' />
														<span className='sr-only'>Open user menu</span>
														<img
															className='h-8 w-8 rounded-full'
															src={ava}
															alt=''
														/>
													</Menu.Button>
												</div>
												<Transition
													as={Fragment}
													enter='transition ease-out duration-100'
													enterFrom='transform opacity-0 scale-95'
													enterTo='transform opacity-100 scale-100'
													leave='transition ease-in duration-75'
													leaveFrom='transform opacity-100 scale-100'
													leaveTo='transform opacity-0 scale-95'
												>
													<Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
														<button
															className='block rounded-md px-3 py-2 text-base font-medium text-gray-40'
															onClick={handleSignOut}
														>
															Sign out
														</button>
													</Menu.Items>
												</Transition>
											</Menu>
										</div>
									</div>
									<div className='-mr-2 flex md:hidden'>
										{/* Mobile menu button */}
										<Disclosure.Button className='relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
											<span className='absolute -inset-0.5' />
											<span className='sr-only'>Open main menu</span>
											{open ? (
												<XMarkIcon
													className='block h-6 w-6'
													aria-hidden='true'
												/>
											) : (
												<Bars3Icon
													className='block h-6 w-6'
													aria-hidden='true'
												/>
											)}
										</Disclosure.Button>
									</div>
								</div>
							</div>

							<Disclosure.Panel className='md:hidden'>
								<div className='border-t border-gray-700 pb-3 pt-4'>
									<div className='flex items-center px-5'>
										<div className='flex-shrink-0'>
											<img
												className='h-10 w-10 rounded-full'
												src={ava}
												alt=''
											/>
										</div>
										<div className='ml-3'>
											<div className='text-base font-medium leading-none text-white'>
												goldrojer666@mail.ru
											</div>
										</div>
									</div>
									<div className='mt-3 space-y-1 px-2'>
										<button
											className='block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white'
											onClick={handleSignOut}
										>
											Sign out
										</button>
									</div>
								</div>
							</Disclosure.Panel>
						</>
					)}
				</Disclosure>
				<div className='input text-center my-10'>
					{/* <input
						type='file'
						onChange={event => {
							setImageUpload(event.target.files[0])
						}}
					/>
					<button onClick={uploadImage}>Upload file</button> */}
				</div>
				{/* ==================================================== Products ============================================== */}
				<Products
					val={val}
					handleCreate={handleCreate}
					handleDelete={handleDelete}
					handleEdit={handleEdit}
					value={value}
					setText={setText}
					text={text}
					url={url}
					title={title}
					imageList={imageList}
					setUrl={setUrl}
					setTitle={setTitle}
					handleUpdate={handleUpdate}
				/>
				<Products2 />
			</div>
		</>
	)
}
