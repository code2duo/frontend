import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'

 import SelectorIcon from '../../icons/SelectorIcon'



const people = [
  { name: 'Java' },
  { name: 'C' },
  { name: 'C++' },
  { name: 'Python' },
  
]

export default function Example() {
  const [selected, setSelected] = useState(people[0])

  return (
    <div className="w-auto fixed top-16">
      <Listbox value={selected} onChange={setSelected}>
         <Listbox.Label className="text-primary-300 text-lg">
              Preffered Language:
          </Listbox.Label>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full py-3  px-6 text-center bg-primary-600 rounded-md cursor-default focus:outline-none  sm:text-sm">
            <span className="block truncate text-lg text-primary-200">{selected.name}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-primary-200">
                <SelectorIcon
                aria-hidden="true"
              />  
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute w-full  overflow-auto mt-1 bg-primary-600  rounded-md   focus:outline-none sm:text-sm">
              {people.map((person, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    `${active ? 'text-primary-200 bg-primary-700 pl-6 font-bold py-0.5' : 'text-primary-200 pl-4 py-0.5'}
                          cursor-default select-none relative text-primary-200 `
                  }
                  value={person}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`${
                          selected ? 'font-medium' : 'font-normal'
                        } block truncate`}
                      >
                        {person.name}
                      </span>
                      {selected ? (
                        <span
                          className={`${
                            active ? 'text-primary-600' : 'text-primary-600'
                          }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                        >
                            
                          
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}
