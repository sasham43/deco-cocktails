import { useState, useEffect } from 'react'
import { AsyncStorage } from 'react-native'
import { generate } from 'shortid'

export const useCocktails = () => {
    // set up all the variables in state
    const [cocktails, setCocktails] = useState([])
    const [newCocktailIngredientName, setNewCocktailIngredientName] = useState('')
    const [newCocktailIngredientParts, setNewCocktailIngredientParts] = useState(0)
    const [addedCocktailIngredients, setAddedCocktailIngredients] = useState([])
    const [newCocktailName, setNewCocktailName] = useState('')
    const [addFlag, setFlag] = useState(false)

    const loadCocktails = async () => {
        const data = await AsyncStorage.getItem('cocktails')

        if(data){
            var cocktails = JSON.parse(data)
            setCocktails(cocktails)
        }
    }

    // load cocktails from storage
    useEffect(()=>{
        if(cocktails.length) {
            // setCocktails([]) // if cocktails exist on render, reset to empty for testing 
            return
        }
        loadCocktails()
    }, [])

    // save cocktails to storage when array changes
    useEffect(()=>{
        AsyncStorage.setItem('cocktails', JSON.stringify(cocktails))
    }, [cocktails])

    const addCocktail = (cocktail) => {
        // console.log('adding cocktail')
        setCocktails([cocktail, ...cocktails])
    }

    // addFlag is triggered when we want to add a cocktail, wait for ingredients to change before adding
    useEffect(()=>{
        if(addFlag){
            addCocktail({
                id: generate(),
                name: newCocktailName,
                ingredients: addedCocktailIngredients
            })
        } else {
            // console.log('no add flag')
        }
    }, [addFlag,addedCocktailIngredients])

    async function addIngredientToCocktail() {
        var added = [{
            id: generate(),
            ingredient_name: newCocktailIngredientName,
            parts: newCocktailIngredientParts
        }, ...addedCocktailIngredients]

        setAddedCocktailIngredients(added)
        setNewCocktailIngredientName('')
        setNewCocktailIngredientParts(0)
    }
    function resetNewCocktail() {
        // console.log('resetting')
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

// export const newCocktail = () => {
//     const [newCocktailIngredientName, setNewCocktailIngredientName] = useState('')
//     const [newCocktailIngredientParts, setNewCocktailIngredientParts] = useState(0)
//     const [addedCocktailIngredients, setAddedCocktailIngredients] = useState([])

//     async function addIngredientToCocktail() {
//             var added = [{
//                 id: generate(),
//                 ingredient_name: newCocktailIngredientName,
//                 parts: newCocktailIngredientParts
//             }, ...addedCocktailIngredients]
    
//             setAddedCocktailIngredients(added)
//             setNewCocktailIngredientName('')
//             setNewCocktailIngredientParts(0)
//     }
//     function resetNewCocktail(){
//         // console.log('resetting')
//         setNewCocktailIngredientName('')
//         setNewCocktailIngredientParts(0)
//         setAddedCocktailIngredients([])
//     }

//     function setName(name){
//         setNewCocktailIngredientName(name)
//     }
//     function setParts(parts){
//         setNewCocktailIngredientParts(parts)
//     }

//     return {  setFlag, newCocktailIngredientName, newCocktailIngredientParts, addedCocktailIngredients, addIngredientToCocktail, setName, setParts, resetNewCocktail }
// }