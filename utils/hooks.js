import { useState, useEffect } from 'react'
import { AsyncStorage } from 'react-native'
import { generate } from 'shortid'

export const useCocktails = () => {
    const [cocktails, setCocktails] = useState([])

    const loadCocktails = async () => {
        const data = await AsyncStorage.getItem('cocktails')

        if(data){
            var cocktails = JSON.parse(data)
            setCocktails(cocktails)
        }
    }

    useEffect(()=>{
        if(cocktails.length) {
            setCocktails([]) 
            return
        }
        loadCocktails()
    }, [])

    useEffect(()=>{
        AsyncStorage.setItem('cocktails', JSON.stringify(cocktails))
    }, [cocktails])

    const addCocktail = (cocktail) => {
        console.log('adding cocktail')
        setCocktails([cocktail, ...cocktails])
    }

    const [newCocktailIngredientName, setNewCocktailIngredientName] = useState('')
    const [newCocktailIngredientParts, setNewCocktailIngredientParts] = useState(0)
    const [addedCocktailIngredients, setAddedCocktailIngredients] = useState([])
    const [newCocktailName, setNewCocktailName] = useState('')

    const [addFlag, setFlag] = useState(false)

    useEffect(()=>{
        if(addFlag){

            console.log('effect', addedCocktailIngredients)
            addCocktail({
                        id: generate(),
                        name: newCocktailName,
                        ingredients: addedCocktailIngredients
                    })
        } else {
            console.log('no add flag')
        }
    }, [addFlag,addedCocktailIngredients])



    // jank AF    
    // useEffect(()=>{
    //     console.log('add flag')
    // }, [addFlag])

    async function addIngredientToCocktail() {
        // return new Promise((resolve)=>{

        var added = [{
            id: generate(),
            ingredient_name: newCocktailIngredientName,
            parts: newCocktailIngredientParts
        }, ...addedCocktailIngredients]

        console.log('adding in hook', added, addedCocktailIngredients)

        setAddedCocktailIngredients(added)
        setNewCocktailIngredientName('')
        setNewCocktailIngredientParts(0)

        console.log('finished adding', addedCocktailIngredients)
        // resolve()
        // })

    }
    function resetNewCocktail() {
        console.log('resetting')
        setNewCocktailIngredientName('')
        setNewCocktailIngredientParts(0)
        setAddedCocktailIngredients([])
    }

    function setName(name) {
        setNewCocktailIngredientName(name)
    }
    function setParts(parts) {
        setNewCocktailIngredientParts(parts)
    }

    return { setFlag, newCocktailName, setNewCocktailName, cocktails, addCocktail, newCocktailIngredientName, newCocktailIngredientParts, addedCocktailIngredients, addIngredientToCocktail, setName, setParts, resetNewCocktail}
}

export const newCocktail = () => {
    const [newCocktailIngredientName, setNewCocktailIngredientName] = useState('')
    const [newCocktailIngredientParts, setNewCocktailIngredientParts] = useState(0)
    const [addedCocktailIngredients, setAddedCocktailIngredients] = useState([])

    async function addIngredientToCocktail() {
        // return new Promise((resolve)=>{

            var added = [{
                id: generate(),
                ingredient_name: newCocktailIngredientName,
                parts: newCocktailIngredientParts
            }, ...addedCocktailIngredients]
    
            console.log('adding in hook', added, addedCocktailIngredients)

            // setAddedCocktailIngredients(state=>{
            //     var added = [{
            //         id: generate(),
            //         ingredient_name: state.newCocktailIngredientName,
            //         parts: state.newCocktailIngredientParts
            //     }, ...state.addedCocktailIngredients]
            //     return {addedCocktailIngredients: added}
            // })
    
            setAddedCocktailIngredients(added)
            setNewCocktailIngredientName('')
            setNewCocktailIngredientParts(0)

            console.log('finished adding', addedCocktailIngredients)
            // resolve()
        // })

    }
    function resetNewCocktail(){
        console.log('resetting')
        setNewCocktailIngredientName('')
        setNewCocktailIngredientParts(0)
        setAddedCocktailIngredients([])
    }

    function setName(name){
        setNewCocktailIngredientName(name)
    }
    function setParts(parts){
        setNewCocktailIngredientParts(parts)
    }

    return {  setFlag, newCocktailIngredientName, newCocktailIngredientParts, addedCocktailIngredients, addIngredientToCocktail, setName, setParts, resetNewCocktail }
}