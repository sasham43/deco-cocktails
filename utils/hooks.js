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
    const [editIngredientId, setEditIngredientId] = useState('')

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
        
        resetNewCocktail()
    }

    // addFlag is triggered when we want to add a cocktail, wait for ingredients to change before adding
    useEffect(()=>{
        if (addFlag && addedCocktailIngredients.length){
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
        if (editIngredientId){
            var added = addedCocktailIngredients.map(a=>{
                if(a.id == editIngredientId){
                    console.log('yo', newCocktailIngredientParts)
                    return {
                        id: editIngredientId,
                        ingredient_name: newCocktailIngredientName,
                        parts: newCocktailIngredientParts
                    }
                } else {
                    console.log('no map', a, editIngredientId)
                    return a
                }
            })
        } else {
            var added = [{
                id: generate(),
                ingredient_name: newCocktailIngredientName,
                parts: newCocktailIngredientParts
            }, ...addedCocktailIngredients]
        }

        setAddedCocktailIngredients(added)
        setNewCocktailIngredientName('')
        setNewCocktailIngredientParts(0)
        setEditIngredientId('')
    }
    function resetNewCocktail() {
        // console.log('resetting')
        setNewCocktailName('')
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



    function editCocktailIngredient(id) {
        var ingredient = addedCocktailIngredients.find(a=>a.id == id)
        console.log('ingredient, id', ingredient, id)
        setNewCocktailIngredientName(ingredient.ingredient_name)
        setNewCocktailIngredientParts(ingredient.parts)
        setEditIngredientId(id)
    }

    return { setFlag, newCocktailName, setNewCocktailName, cocktails, addCocktail, newCocktailIngredientName, newCocktailIngredientParts, addedCocktailIngredients, addIngredientToCocktail, setName, setParts, resetNewCocktail, editCocktailIngredient}
}

export const useStock = () => {
    // for testing
    // var default_stock = [
    //     {
    //         id: generate(),
    //         label: 'Rye',
    //         in_stock: true
    //     },
    //     {
    //         id: generate(),
    //         label: 'Gin',
    //         in_stock: true
    //     },
    //     {
    //         id: generate(),
    //         label: 'Sweet Vermouth',
    //         in_stock: true
    //     },
    //     {
    //         id: generate(),
    //         label: 'Rum',
    //         in_stock: false
    //     },
    // ]

    const [stock, setStock] = useState([])
    const [newStockName, setNewStockName] = useState('')
    const [newStockIn, setNewStockIn] = useState(true)
    // const [stock, setStock] = useState(default_stock)

    // load stock from storage
    useEffect(() => {
        if (stock.length) {
            // setStock([]) // if stock exist on render, reset to empty for testing 
            return
        }
        loadStock()
    }, [])

    // save stock to storage when array changes
    useEffect(() => {
        AsyncStorage.setItem('stock', JSON.stringify(stock))
    }, [stock])

    const loadStock = async () => {
        const data = await AsyncStorage.getItem('stock')

        if (data) {
            var stock = JSON.parse(data)
            setStock(stock)
        }
    }    
    
    function setInStock(bottle, value){
        var updated_stock = stock.map(b=>{
            if(b.id == bottle.id){
                b.in_stock = value
                // console.log('updated', b, bottle, value)
            }

            return b
        })

        setStock(updated_stock)
    }

    function isInStock(name){
        var found = stock.find(bottle=>{
            return bottle.label.toLowerCase() == name.toLowerCase()
        })

        if(found && found.in_stock == true){
            return true
        } else {
            return false
        }
    }

    function addToStock(){
        var added = [{
            id: generate(),
            label: newStockName,
            in_stock: newStockIn
        }, ...stock]

        setStock(added)

        resetNewStock()
    }
    function toggleStockIn(){
        setNewStockIn(!newStockIn)
    }

    function resetNewStock(){
        setNewStockName('')
        setNewStockIn(true)
    }

    return {stock, setStock, setInStock, isInStock, newStockName, setNewStockName, newStockIn, setNewStockIn, addToStock, toggleStockIn}
}