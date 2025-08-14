import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { type ReactNode } from 'react';

interface IProps {
    title?: string;
    description?: string;
    children: ReactNode;
    isOpen: boolean; 
    onClose: () => void;
}

const Modal = ({isOpen, onClose, title, description, children}: IProps) => {


return (
<>
    <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={onClose} __demoMode>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full backdrop-blur-md items-center justify-center p-4">
                <DialogPanel
                    transition
                    className="w-full max-w-md rounded-xl bg-white/80 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
                >
                    <DialogTitle as="h3" className="text-base/7 font-medium text-indigo-500">
                        {title}
                    </DialogTitle>

                    <div className='mt-4'>
                        <div className='mb-4 text-indigo-500'>
                            {description}
                        </div>
                        {children}
                    </div>
                </DialogPanel>
            </div>
        </div>
    </Dialog>
</>
)
}

export default Modal;