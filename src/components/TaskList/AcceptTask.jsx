import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const AcceptTask = ({ data, employeeId }) => {

    const [userData, setUserData] = useContext(AuthContext)

    const updateTask = (status) => {
        const updated = userData.map((emp) => {
            if (emp.id === employeeId) {
                const updatedTasks = emp.tasks.map((t) => {
                    if (t.taskTitle === data.taskTitle && t.taskDate === data.taskDate) {
                        if (status === 'completed') {
                            return { ...t, active: false, completed: true, failed: false }
                        } else {
                            return { ...t, active: false, completed: false, failed: true }
                        }
                    }
                    return t
                })
                const counts = {
                    ...emp.taskCounts,
                    active: emp.taskCounts.active - 1,
                    completed: status === 'completed' ? emp.taskCounts.completed + 1 : emp.taskCounts.completed,
                    failed: status === 'failed' ? emp.taskCounts.failed + 1 : emp.taskCounts.failed
                }
                return { ...emp, tasks: updatedTasks, taskCounts: counts }
            }
            return emp
        })
        setUserData(updated)
        localStorage.setItem('employees', JSON.stringify(updated))
        const loggedIn = JSON.parse(localStorage.getItem('loggedInUser'))
        const updatedEmp = updated.find(e => e.id === employeeId)
        localStorage.setItem('loggedInUser', JSON.stringify({ ...loggedIn, data: updatedEmp }))
        window.location.reload()
    }

    return (
        <div className='flex-shrink-0 h-full w-[300px] p-5 bg-red-400 rounded-xl'>
            <div className='flex justify-between items-center'>
                <h3 className='bg-red-600 text-sm px-3 py-1 rounded'>{data.category}</h3>
                <h4 className='text-sm'>{data.taskDate}</h4>
            </div>
            <h2 className='mt-5 text-2xl font-semibold'>{data.taskTitle}</h2>
            <p className='text-sm mt-2'>
                {data.taskDescription}
            </p>
            <div className='flex justify-between mt-6'>
                <button onClick={() => updateTask('completed')} className='bg-green-500 rounded font-medium py-1 px-2 text-xs'>Mark as Completed</button>
                <button onClick={() => updateTask('failed')} className='bg-red-500 rounded font-medium py-1 px-2 text-xs'>Mark as Failed</button>
            </div>
        </div>
    )
}

export default AcceptTask