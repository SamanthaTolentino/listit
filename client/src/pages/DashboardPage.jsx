import React, { useEffect, useState } from 'react'
import { useAuthStore } from '../store/authStore'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faXmark, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import Menu from '../components/Menu';
import moment from '../../node_modules/moment/src/moment'

const DashboardPage = () => {
  const [taskFormOpen, setTaskFormOpen] = useState(false)
  const [categoryFormOpen, setCategoryFormOpen] = useState(false)
  const [categoryName, setCategoryName] = useState('')
  const [categoryColor, setCategoryColor] = useState('default')
  const [taskName, setTaskName] = useState('')
  const [taskDescription, setTaskDescription] = useState('')
  const [taskCategory, setTaskCategory] = useState('default')
  const [taskDeadline, setTaskDeadline] = useState('')
  const [tasks, setTasks] = useState([])
  const [todaysDate, setTodaysDate] = useState(new Date())
  const [currentDate, setCurrentDate] = useState(new Date())
  const [dayBefore, setDayBefore] = useState(new Date())
  const [dayAfter, setDayAfter] = useState(new Date())
  const [taskClicked, setTaskClicked] = useState(null)
  const [deleteClicked, setDeleteClicked] = useState(false)
  const [deleteCategoryClicked, setDeleteCategoryClicked] = useState(false)
  const [editCategoriesClicked, setEditCategoriesClicked] = useState(false)
  const { user, logout, error, message, resetErrorMsg, resetMsg, addCategory, editCategory, deleteCategory, addTask, editTask, deleteTask, completeTask, incompleteTask } = useAuthStore()

  const btnVariants = {
    tap: {
      scale: 1,
      transition: {
        duration: 0.1,
        ease: 'easeOut' 
      },
    }
  }

  const colorVariants = {
    red: {bg: 'bg-red-category', border: 'border-red-category', text: 'text-red-category', ellipsisHover: 'hover:bg-red-2'},
    orange: {bg: 'bg-orange-category', border: 'border-orange-category', text: 'text-orange-category', ellipsisHover: 'hover:bg-orange-1'},
    yellow: {bg: 'bg-yellow-category', border: 'border-yellow-category', text: 'text-yellow-category', ellipsisHover: 'hover:bg-yellow-1'},
    green: {bg: 'bg-green-category', border: 'border-green-category', text: 'text-green-category', ellipsisHover: 'hover:bg-green-4'},
    blue: {bg: 'bg-blue-category', border: 'border-blue-category', text: 'text-blue-category', ellipsisHover: 'hover:bg-blue-1'},
    purple: {bg: 'bg-purple-category', border: 'border-purple-category', text: 'text-purple-category', ellipsisHover: 'hover:bg-purple-1'},
    pink: {bg: 'bg-pink-category', border: 'border-pink-category', text: 'text-pink-category', ellipsisHover: 'hover:bg-pink-1'},
  }

  const options = {
    month: 'short',
    day: 'numeric',
  }

  useEffect(() => {
    setDayBefore(dayBefore.setDate(currentDate.getDate() - 1))
    setDayBefore(new Date(dayBefore))
    setDayAfter(dayAfter.setDate(currentDate.getDate() + 1))
    setDayAfter(new Date(dayAfter))

    resetErrorMsg()
    resetMsg()
  }, [])

  useEffect(() => {
    const categories = [...new Set(user.tasks.map(task => task.category))]
    
    let filteredTasks = []
    let filteredCategories = []
    categories.forEach((category) => {
      let cat = user.categories.find((userCat) => userCat.id == category)
      cat.dateAdded = new Date(cat.dateAdded)
      filteredCategories.push(cat)
    })

    filteredCategories.sort((a, b) => a.dateAdded - b.dateAdded)

    filteredCategories.forEach((category) => {
      let arr = user.tasks.filter((task) => task.category == category.id)
      arr = arr.filter((task) => new Date(task.deadline).toLocaleDateString() == currentDate.toLocaleDateString())
      filteredTasks.push(arr)
    })

    filteredTasks.forEach((taskArr) => {
      taskArr.forEach((task) => {
        task.deadline = new Date(task.deadline)
      })
    })

    filteredTasks.forEach((taskArr) => {
      taskArr.sort((a, b) => a.deadline - b.deadline)
    })
    
    let allTasks = []
    filteredTasks.forEach((taskArr) => {
      let completeTasks = []
      let firstTaskCompleted = false
      for (let i = 0; i < taskArr.length; i++) {
        if (taskArr[i].complete) {
          if (!firstTaskCompleted) {
            firstTaskCompleted = true
            taskArr[i].firstCompleted = true
          }
          completeTasks.push(taskArr[i])
          taskArr.splice(i, 1)[0]
          i--
        }
      }

      allTasks.push(taskArr.concat(completeTasks))
    })

    filteredTasks = allTasks
    
    setTasks(filteredTasks)
  }, [user, currentDate])

  useEffect(() => {
    if (taskClicked) {
      setTaskName(taskClicked.name)
      setTaskDescription(taskClicked.description)
      setTaskCategory(taskClicked.category)
      setTaskDeadline(moment(taskClicked.deadline).format('YYYY-MM-DDTHH:mm'))
    }
  }, [taskClicked])
  
  const handleCategorySubmit = async (e) => {
    e.preventDefault()

    if (editCategoriesClicked) {
      if (!deleteCategoryClicked) {
        await editCategory(taskCategory, categoryName, categoryColor)
      }
      else {
        await deleteCategory(taskCategory)
        setDeleteCategoryClicked(false)
        setTaskCategory('default')
        setCategoryName('')
        setCategoryColor('default')
        resetErrorMsg()
        resetMsg()
      }
    }
    else {
      await addCategory(categoryName, categoryColor)
    }
  }

  const handleTaskSubmit = async (e) => {
    e.preventDefault()

    if (taskClicked) {
      if (!deleteClicked) {
        await editTask(taskClicked.id, taskName, taskDescription, taskCategory, taskDeadline)
      }
      else {
        await deleteTask(taskClicked.id)
        setDeleteClicked(false)
        setTaskCategory('default')
        setTaskName('')
        setTaskDescription('')
        setTaskDeadline('')
        setTaskFormOpen(false)
        setTaskClicked(null)
        resetMsg()
      }
    }
    else {
      await addTask(taskName, taskDescription, taskCategory, taskDeadline)
      setTaskName('')
      setTaskDescription('')
      setTaskCategory('default')
      setTaskDeadline('')
    }
  }

  const handleTaskFormClosed = () => {
    setTaskFormOpen(false)
    setTaskName('')
    setTaskDescription('')
    setTaskCategory('default')
    setTaskDeadline('')
    setTaskClicked(null)
    resetErrorMsg()
    resetMsg()
  }

  const handleCategoryFormClosed = () => {
    setCategoryFormOpen(false)
    setEditCategoriesClicked(false)
    setTaskCategory('default')
    setCategoryName('')
    setCategoryColor('default')
    resetErrorMsg()
    resetMsg()
  }

  const getEditCategoryNameColor = (taskValue) => {
    setTaskCategory(taskValue)

    let category = user.categories.find(cat => cat.id == taskValue)
    setCategoryName(category.name)
    setCategoryColor(category.color)
  }

  const markTaskComplete = async (id) => {
    await completeTask(id)
  }

  const markTaskIncomplete = async (id) => {
    await incompleteTask(id)
  }

  const getDateBefore = () => {
    setCurrentDate(dayBefore)

    let dateNow = dayBefore
    let newDayBefore = dateNow.setDate(dateNow.getDate() - 1)
    let newDayAfter = dateNow.setDate(dateNow.getDate() + 2)

    setDayBefore(dayBefore.setDate(currentDate.getDate() - 1))
    setDayBefore(new Date(newDayBefore))
    setDayAfter(dayAfter.setDate(currentDate.getDate() + 2))
    setDayBefore(new Date(newDayBefore))
    setDayAfter(new Date(newDayAfter))
  }

  const getDateAfter = () => {
    setCurrentDate(dayAfter)
    
    let dateNow = dayAfter
    let newDayAfter = dateNow.setDate(dateNow.getDate() + 1)
    let newDayBefore = dateNow.setDate(dateNow.getDate() - 2)

    setDayBefore(dayBefore.setDate(currentDate.getDate() - 2))
    setDayBefore(new Date(newDayBefore))
    setDayAfter(dayAfter.setDate(currentDate.getDate() + 1))
    setDayBefore(new Date(newDayBefore))
    setDayAfter(new Date(newDayAfter))
  }

  const displayAddTaskMsg = () => {
    let noTasks = <div className='lg:px-16 px-6 text-xl font-medium text-gray-5'>You have no tasks for this day.</div>

    if (user.tasks.length) {
      let currentDateMatch = user.tasks.find((task) => new Date(task.deadline).toDateString() == currentDate.toDateString())
      console.log('cur', currentDateMatch)

      if (!currentDateMatch) {
        return noTasks
      }
    }
    else {
      return noTasks
    }
  }

  return (
    <div className={`bg-light-purple-2 md:h-screen flex flex-col py-1 px-2 relative`}>
      {taskFormOpen || categoryFormOpen ? <div className='fixed h-screen w-screen bg-white opacity-60 z-20'></div> : <></>}
      <div className='absolute top-0 left-0 w-full'>
        <Menu />
      </div>
      <div className='flex md:flex-row flex-col items-center justify-between lg:px-16 px-6 py-8 mt-16'>
        {/* <div className='flex'> */}
          <div className='flex items-center md:mb-0 mb-6'>
            <button onClick={getDateBefore} className='text-2xl text-gray-4 transition hover:text-gray-5'>{todaysDate.toLocaleDateString() == dayBefore.toLocaleDateString() ? 'Today' : dayBefore.toLocaleDateString(undefined, options)}</button>
            <button className='text-4xl mx-8 font-medium flex flex-col text-gray-5'>{todaysDate.toLocaleDateString() == currentDate.toLocaleDateString() ? 'Today' : currentDate.toLocaleDateString(undefined, options)}
              <div className='flex justify-center'>
                <div className='border-b-3 border-light-purple-1 pb-2 w-1/3'></div>
              </div>
            </button>
            <button onClick={getDateAfter} className='text-2xl text-gray-4 hover:text-gray-5'>{todaysDate.toLocaleDateString() == dayAfter.toLocaleDateString() ? 'Today' : dayAfter.toLocaleDateString(undefined, options)}</button>
          </div>
          <div className='flex items-center button-div-small-screen md:px-0 px-6 md:w-fit w-full'>
            <motion.button onClick={() => setTaskFormOpen(true)} className='md:w-fit w-1/2 font-medium border-2 border-light-purple-5 text-dark-purple-2 py-3 px-5 rounded-full shadow-sm flex items-center justify-center md:mr-0 mr-3 button-small-screen button-small-screen-mb'
              whileHover={{
                scale: 1.1,
                border: 'solid 1px #827CF1',
                transition: {
                  duration: 0.2,
                  ease: 'easeInOut' 
                }
              }}
              whileTap='tap'
              variants={btnVariants}    
            >
              <FontAwesomeIcon className='mr-3' icon={faPlus} size='sm' />
              Task
            </motion.button>
            <motion.button onClick={() => setCategoryFormOpen(true)} className='md:w-fit w-1/2 font-medium border-2 border-light-purple-5 text-dark-purple-2 py-3 px-5 rounded-full shadow-sm flex items-center justify-center md:ml-3 button-small-screen'
              whileHover={{
                scale: 1.1,
                border: 'solid 1px #827CF1',
                transition: {
                  duration: 0.2,
                  ease: 'easeInOut' 
                }
              }}
              whileTap='tap'
              variants={btnVariants}      
            >
              <FontAwesomeIcon className='mr-4' icon={faPlus} size='sm' />
              Category
            </motion.button>
            {
              taskFormOpen ? 
                <div className='fixed top-0 left-0 z-20 w-screen h-screen flex items-center justify-center'>
                  <motion.div className='w-full h-full md:max-w-screen-3xl flex justify-center items-center lg:px-0 p-6'
                    initial={{ opacity: 0, y: -30}}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: 'easeInOut', delay: 0.05}}
                  >
                    <div className='bg-white rounded-b-md rounded-t-sm overflow-clip md:max-w-xl task-form overflow-y-auto overflow-x-auto shadow-xl w-full shadow-light-purple-2'>
                      <div className='border-t-4 border-light-purple-1 bg-light-purple-2 py-4 px-4 text-light-purple-1 flex items-center justify-between'>
                        <div className='text-lg'>{taskClicked ? 'Edit Task' : 'Add New Task'}</div>
                        <button onClick={handleTaskFormClosed}><FontAwesomeIcon className='text-gray-4 transition hover:text-light-purple-1' icon={faXmark} size='xl' /></button>
                      </div>
                      <form onSubmit={handleTaskSubmit} className='py-6 px-5 flex flex-col text-gray-5'>
                        <input onChange={(e) => setTaskName(e.target.value)} value={taskName} type="text" placeholder='Task Name' className='bg-gray-8 shadow-sm rounded-full py-3 px-4 mb-6 focus:outline-light-purple-5 focus:ring-1' />
                        {/* Ensure this could be scrolled on screens with less height */}
                        <textarea onChange={(e) => setTaskDescription(e.target.value)} value={taskDescription} placeholder='Task Description' className='bg-gray-8 shadow-sm rounded-lg py-3 px-4 mb-6 focus:outline-light-purple-5 focus:ring-1'></textarea>
                        <div className='flex sm:flex-row flex-col items-center mb-6'>
                          <div className='flex flex-col sm:w-1/2 w-full sm:pr-1 pr-0 sm:mb-0 mb-6'>
                            <select onChange={(e) => setTaskCategory(e.target.value)} defaultValue={'default'} value={taskCategory} className='bg-gray-8 shadow-sm rounded-full py-3 px-4 focus:outline-light-purple-5 focus:ring-1 focus:ring-light-purple-5 border-r-10 border-transparent'>
                            <option value="default" className='bg-white' disabled>Select Category</option>
                              {
                                user.categories.map((category, index) => 
                                  <option value={category.id} key={index} className='bg-white'>{category.name}</option>
                                )
                              }
                            </select>
                          </div>
                          <div className='flex flex-col sm:w-1/2 w-full sm:pl-1 pl-0'>
                            <input onChange={(e) => setTaskDeadline(e.target.value)} value={taskDeadline} type="datetime-local" className='bg-gray-8 shadow-sm rounded-full py-3 px-4 focus:outline-light-purple-5 focus:ring-1 focus:ring-light-purple-5 border-r-10 border-transparent' />
                          </div>
                        </div>
                        {error ? <p className='text-red-2 font-medium ml-2 mb-4'>{error}</p> : !error && message ? <p className='text-green-2 font-medium ml-2 mb-4'>{message}</p> : ''}
                        <div className='flex sm:flex-row flex-col justify-end font-medium'>
                          {
                            taskClicked ?
                              <motion.button onClick={() => setDeleteClicked(true)} className='bg-red-1 text-white rounded-full px-5 sm:py-3 py-4 sm:w-1/3 w-full shadow-md sm:mr-3 sm:mb-0 mb-3' type='submit'
                                whileHover={{
                                  background: '#C94646',
                                  transition: {
                                    duration: 0.2,
                                    ease: 'easeInOut' 
                                  }
                                }}
                                whileTap='tap'
                                variants={btnVariants}
                              >
                                Delete
                              </motion.button>
                            : ''
                          }
                          <motion.button className='bg-light-purple-1 text-white rounded-full px-7 sm:py-3 py-4 sm:w-1/3 w-full shadow-md' type='submit'
                            whileHover={{
                              background: '#534CC7',
                              transition: {
                                duration: 0.2,
                                ease: 'easeInOut' 
                              }
                            }}
                            whileTap='tap'
                            variants={btnVariants}
                          >
                            Save
                          </motion.button>
                        </div>
                      </form>
                    </div>
                  </motion.div>
                </div>
              :
                <></>
            }
            {
              categoryFormOpen ? 
                <div className='fixed top-0 left-0 z-20 w-screen h-screen flex items-center justify-center'>
                  <motion.div className='w-full h-full md:max-w-screen-3xl flex justify-center items-center lg:px-0 p-6'
                    initial={{ opacity: 0, y: -30}}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: 'easeInOut', delay: 0.05}}
                  >
                    <div className='bg-white rounded-b-md rounded-t-sm overflow-clip md:max-w-xl task-form overflow-y-auto shadow-xl w-full shadow-light-purple-2'>
                      <div className='border-t-4 border-light-purple-1 bg-light-purple-2 py-4 px-4 text-light-purple-1 flex items-center justify-between'>
                        <div className='text-lg'>{!editCategoriesClicked ? 'Add New Category' : 'Edit Categories'}</div>
                        <button onClick={(e) => handleCategoryFormClosed()}><FontAwesomeIcon className='text-gray-4 transition hover:text-light-purple-1' icon={faXmark} size='xl' /></button>
                      </div>
                      {
                        !editCategoriesClicked ?
                          <div className='px-4 mt-4'>
                            <motion.button onClick={() => {setEditCategoriesClicked(true); resetErrorMsg(); resetMsg()}} className='font-medium border-2 border-light-purple-5 text-dark-purple-2 py-3 px-5 rounded-full shadow flex items-center'
                              whileHover={{
                                scale: 1.1,
                                border: 'solid 1px #827CF1',
                                transition: {
                                  duration: 0.2,
                                  ease: 'easeInOut' 
                                }
                              }}
                              whileTap='tap'
                              variants={btnVariants}  
                            >
                              Edit Categories
                            </motion.button>
                          </div>
                        : ''
                      }
                      <form onSubmit={handleCategorySubmit} className='py-6 px-5 flex flex-col text-gray-5'>
                        {
                          editCategoriesClicked ? 
                            <div className='flex flex-col'>
                              <select onChange={(e) => getEditCategoryNameColor(e.target.value)} defaultValue={'default'} value={taskCategory} className={`${taskCategory == 'default' ? '' : 'mb-6'} bg-gray-8 shadow-sm rounded-full py-3 px-4 focus:outline-light-purple-5 focus:ring-1 focus:ring-light-purple-5 border-r-10 border-transparent`}>
                                <option value="default" className='bg-white' disabled>Select Category</option>
                                {
                                  user.categories.map((category, index) => 
                                    <option value={category.id} key={index} className='bg-white'>{category.name}</option>
                                  )
                                }
                              </select>
                            </div>
                          : ''
                        }
                        {
                          (editCategoriesClicked && taskCategory !== 'default') || (!editCategoriesClicked) ? 
                            <div className='flex flex-col'>
                              {/* <label className='mb-2 ml-1'>Name</label> */}
                              <input onChange={(e) => setCategoryName(e.target.value)} value={categoryName} type="text" placeholder='Category Name' className='bg-gray-8 shadow-sm rounded-full py-3 px-4 mb-6 focus:outline-light-purple-5 focus:ring-1' />
                              {/* <label className='mb-2 ml-1'>Color</label> */}
                              <select onChange={(e) => setCategoryColor(e.target.value)} defaultValue={'default'} value={categoryColor} className={`bg-gray-8 shadow-sm rounded-full py-3 px-4 mb-6 focus:outline-light-purple-5 focus:ring-1 focus:ring-light-purple-5 border-r-10 border-transparent ${categoryColor !== 'default' ? `${colorVariants[categoryColor].text} font-medium` : ''}`}>
                                <option value="default" className='bg-white' disabled>Select Color</option>
                                <option value="red" className='bg-white font-medium text-red-category'>Red</option>
                                <option value="orange" className='bg-white font-medium text-orange-category'>Orange</option>
                                <option value="yellow" className='bg-white font-medium text-yellow-category'>Yellow</option>
                                <option value="green" className='bg-white font-medium text-green-category'>Green</option>
                                <option value="blue" className='bg-white font-medium text-blue-category'>Blue</option>
                                <option value="purple" className='bg-white font-medium text-purple-category'>Purple</option>
                                <option value="pink" className='bg-white font-medium text-pink-category'>Pink</option>
                              </select>
                              {error ? <p className='text-red-2 font-medium ml-2 mb-4'>{error}</p> : !error && message ? <p className='text-green-2 font-medium ml-2 mb-4'>{message}</p> : ''}
                              <div className='flex sm:flex-row flex-col justify-end font-medium'>
                                {
                                  editCategoriesClicked ?
                                    <motion.button onClick={() => setDeleteCategoryClicked(true)} className='bg-red-1 text-white rounded-full px-5 sm:py-3 py-4 sm:w-1/3 w-full shadow-md sm:mr-3 sm:mb-0 mb-3' type='submit'
                                      whileHover={{
                                        scale: 1.1,
                                        background: '#C94646',
                                        transition: {
                                          duration: 0.2,
                                          ease: 'easeInOut' 
                                        }
                                      }}
                                      whileTap='tap'
                                      variants={btnVariants}
                                    >
                                      Delete
                                    </motion.button>
                                  : ''
                                }
                                <motion.button className='bg-light-purple-1 text-white rounded-full px-7 sm:py-3 py-4 sm:w-1/3 w-full shadow-md' type='submit'
                                  whileHover={{
                                    background: '#534CC7',
                                    transition: {
                                      duration: 0.2,
                                      ease: 'easeInOut' 
                                    }
                                  }}
                                  whileTap='tap'
                                  variants={btnVariants}
                                >
                                  Save
                                </motion.button>
                              </div>
                            </div>
                          : ''
                        }
                      </form>
                    </div>
                  </motion.div>
                </div>        
              :
                <></>
            }
          </div>
        {/* </div> */}
      </div>
      <div className='w-full flex flex-col grow min-h-0 md:px-0 px-3 md:pb-0 pb-3'>
        <div className='flex flex-col grow w-full overflow-x-auto'>
          {displayAddTaskMsg()}
          <motion.div className='tasks-container w-full h-full lg:px-16 md:max-lg:px-6'
            initial={{ opacity: 0, y: -20}}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut', delay: 0.1}}
          >
            {
              tasks.map((taskCategory, index) => {
                return <motion.div key={index} className={`${!taskCategory.length ? 'hidden' : ''} min-h-0 pr-3 overflow-y-auto relative md:mb-0 mb-4`}
                >
                  {taskCategory.map((task, index) => {
                  let categoryColor = user.categories.find((taskCat) => taskCat.id == task.category)
                  
                  if (categoryColor) {
                    return <div key={index}>
                      <div className={`${index !== 0 ? 'hidden' : 'mb-3 font-medium'} ${colorVariants[categoryColor.color].bg} flex items-center justify-between px-7 py-5 rounded shadow text-white relative`}>
                        <div className='uppercase'>{categoryColor.name}</div>     
                      </div>
                      <div onClick={() => {setTaskFormOpen(true); setTaskClicked(task)}} className={`${index > 0 ? 'mt-3' : ''} ${task.complete ? 'bg-green-1 transition lg:hover:bg-green-3' : 'bg-white transition lg:hover:bg-gray-3'} border-l-4 ${task.complete ? 'border-green-2' : colorVariants[categoryColor.color].border} drop-shadow-md p-5 rounded-md rounded-l-none flex items-center cursor-pointer`}>
                        {
                          task.complete ?
                            <>
                              <button onClick={(e) => {markTaskIncomplete(task.id); e.stopPropagation()}} className='lg:block hidden'>
                                <FontAwesomeIcon className={`text-green-category bg-white rounded-full transition hover:text-red-category hover:bg-white`} icon={faCheckCircle} size='3x' />
                              </button>
                              <button onClick={(e) => {markTaskIncomplete(task.id); e.stopPropagation()}} className='block lg:hidden'>
                                <FontAwesomeIcon className={`text-green-category bg-white rounded-full`} icon={faCheckCircle} size='3x' />
                              </button>
                            </>
                          :
                            <>
                              <button onClick={(e) => {markTaskComplete(task.id); ; e.stopPropagation()}} className='lg:block hidden'>
                                <FontAwesomeIcon className={`text-gray-8 bg-gray-2 rounded-full transition hover:text-green-category hover:bg-white`} icon={faCheckCircle} size='3x' />
                              </button>
                              <button onClick={(e) => {markTaskComplete(task.id); ; e.stopPropagation()}} className='block lg:hidden'>
                                <FontAwesomeIcon className={`text-gray-8 bg-gray-2 rounded-full`} icon={faCheckCircle} size='3x' />
                              </button>
                            </>
                        }
                        <div className={`font-medium pl-5`}>
                          <div className='mb-1 line-clamp-1'>{task.name}</div>
                          <div className='text-gray-7 mb-4 font-normal line-clamp-1'>{task.description}</div>
                          <div className={`${task.complete ? 'text-green-2' : colorVariants[categoryColor.color].text}`}>{new Date(task.deadline).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}</div>
                        </div>
                      </div>
                    </div>
                  }
                })}</motion.div>
              })
            }



          </motion.div>
        </div>

      </div>
      
      {/* <button className='bg-red-400' onClick={handleLogout}>Logout</button> */}
    </div>
  )
}

export default DashboardPage
