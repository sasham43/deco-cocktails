import { useState, useEffect } from 'react'
import { AsyncStorage } from 'react-native'
import { generate } from 'shortid'

export const useCocktails = () => {
    // set up all the variables in state
    const [cocktails, setCocktails] = useState([])
    // const [newCocktailIngredientName, setNewCocktailIngredientName] = useState('')
    // const [newCocktailIngredientParts, setNewCocktailIngredientParts] = useState(0)
    const [newCocktailIngredient, setNewCocktailIngredient] = useState({
        ingredient_name: '',
        parts: 0
    })
    const [addedCocktailIngredients, setAddedCocktailIngredients] = useState([])
    const [newCocktailName, setNewCocktailName] = useState('')
    const [addFlag, setFlag] = useState(false)
    const [editIngredientId, setEditIngredientId] = useState('')

    const loadCocktails = async () => {
        const data = await AsyncStorage.getItem('cocktails')
        console.log('data', data)
        if(data){
            var cocktails = JSON.parse(data)
            setCocktails(cocktails)
        }
    }

    // debugging
    useEffect(()=>{
        console.log('cocktail changes', newCocktailName, addedCocktailIngredients)
    }, [newCocktailName])

    // load cocktails from storage
    useEffect(()=>{
        console.log('loading cocktails', cocktails)
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
        // check if we're editing an ingredient or adding a new one
        if (editIngredientId){
            var added = addedCocktailIngredients.map(a=>{
                if(a.id == editIngredientId){
                    return {
                        id: editIngredientId,
                        ingredient_name: newCocktailIngredient.ingredient_name,
                        parts: newCocktailIngredient.parts
                    }
                } else {
                    return a
                }
            })
        } else {
            var added = [{
                id: generate(),
                ingredient_name: newCocktailIngredient.ingredient_name,
                parts: newCocktailIngredient.parts
            }, ...addedCocktailIngredients]
        }

        setAddedCocktailIngredients(added)
        setNewCocktailIngredient({
            ingredient_name: '',
            parts: 0
        })
        setEditIngredientId('')
    }
    function resetNewCocktail() {
        // console.log('resetting')
        setNewCocktailName('')
        setNewCocktailIngredient({
            ingredient_name: '',
            parts: 0
        })
        setAddedCocktailIngredients([])
    }

    function setName(name) {
        setNewCocktailIngredient({
            ingredient_name:name,
            parts: newCocktailIngredient.parts
        })
    }
    function setParts(parts) {
        setNewCocktailIngredient({
            ingredient_name: newCocktailIngredient.ingredient_name,
            parts
        })
    }

    function toggleEditIngredient(id){
        if(editIngredientId == id){
            setEditIngredientId('')
            setNewCocktailIngredient({
                ingredient_name: '',
                parts: 0
            })
        } else {
            editCocktailIngredient(id)
        }
    }

    function editCocktailIngredient(id) {
        var ingredient = addedCocktailIngredients.find(a=>a.id == id)
        setNewCocktailIngredient(ingredient)
        setEditIngredientId(id)
    }

    return { 
        setFlag, 
        newCocktailName, 
        setNewCocktailName, 
        cocktails, 
        addCocktail, 
        newCocktailIngredient, 
        addedCocktailIngredients, 
        setAddedCocktailIngredients,
        addIngredientToCocktail, 
        setName, 
        setParts, 
        resetNewCocktail, 
        editCocktailIngredient,
        editIngredientId, 
        toggleEditIngredient,
    }
}

export const useFunctionMenu = () =>{
    const [showFunctionMenu, setShowFunctionMenu] = useState(false)
    const [currentMode, setCurrentMode] = useState('')

    function toggleFunctionMenu(){
        setShowFunctionMenu(!showFunctionMenu)
    }

    function switchMode(mode){
        if(currentMode == mode){
            setCurrentMode('')
        } else {
            setCurrentMode(mode)
        }
    }

    // useEffect(()=>{
    //     console.log('whats the current mode', currentMode)
    // })

    return {
        toggleFunctionMenu,
        showFunctionMenu,
        switchMode,
        currentMode
    }
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