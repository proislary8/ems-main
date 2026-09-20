import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const NewTask = ({ data, employeeId }) => {

    const [userData, setUserData] = useContext(AuthContext)

    const acceptTask = () => {
        const updated = userData.map((emp) => {
            if (emp.id === employeeId) {
                const updatedTasks = emp.tasks.map((t) => {
                    if (t.taskTitle === data.taskTitle && t.taskDate === data.taskDate) {
                        return { ...t, active: true, newTask: false }
                    }
                    return t
                })
                return {
                    ...emp,
                    tasks: updatedTasks,
                    taskCounts: {
                        ...emp.taskCounts,
                        newTask: emp.taskCounts.newTask - 1,
                        active: emp.taskCounts.active + 1
                    }
                }
            }
            return emp
        })
        setUserData(updated)
        localStorage.setItem('employees', JSON.stringify(updated))
        // Update the logged-in user's stored data
        const loggedIn = JSON.parse(localStorage.getItem('loggedInUser'))
        const updatedEmp = updated.find(e => e.id === employeeId)
        localStorage.setItem('loggedInUser', JSON.stringify({ ...loggedIn, data: updatedEmp }))
        window.location.reload()
    }

    return (
        <div className='flex-shrink-0 h-full w-[300px] p-5 bg-green-400 rounded-xl'>
            <div className='flex justify-between items-center'>
                <h3 className='bg-red-600 text-sm px-3 py-1 rounded'>{data.category}</h3>
                <h4 className='text-sm'>{data.taskDate}</h4>
            </div>
            <h2 className='mt-5 text-2xl font-semibold'>{data.taskTitle}</h2>
            <p className='text-sm mt-2'>
                {data.taskDescription}
            </p>
            <div className='mt-6'>
                <button onClick={acceptTask} className='bg-blue-500 rounded font-medium py-1 px-2 text-xs'>Accept Task</button>
            </div>
        </div>
    )
}

export default NewTask