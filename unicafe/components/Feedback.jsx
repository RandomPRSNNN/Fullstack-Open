import Button from "./Button"

const Feedback = ({addGood, addBad, addNeutral}) => {
    return (
        <div>
            <h1>Give Feedback Below</h1>
            <Button text='Good' onClick={addGood}/>
            <Button text='Neutral' onClick={addNeutral}/>
            <Button text='Bad' onClick={addBad}/>
        </div>
    )
}

export default Feedback