import React from 'react'

const Persons = props => {
    return (
        <div>
            {props.persons
                .filter(person => person.name.toLowerCase().includes(props.filter))
                .map(person => {
                    return (
                        <div key={person.id}>
                            {person.name} {person.number}
                            <button onClick={() => props.handleDelete(person.id, person.name)}>delete</button>
                        </div>
                )})}
        </div>
    )
}

export default Persons