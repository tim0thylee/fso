import React from 'react'

const Notification = ({message, isError}) => {
    const success = {
        border: 'green solid',
        color: 'green',
        fontSize: 20,
        padding: 10,
        borderRadius: 5,
        backgroundColor: 'lightgrey'
    }

    const fail = {
        color: 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    if (!message) {
        return null
    }

    return (
        <div style={isError ? fail : success}>
            {message}
        </div>
    )
}

export default Notification