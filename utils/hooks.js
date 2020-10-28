import { useState, useEffect } from 'react'
import { AsyncStorage } from 'react-native'
import { generate } from 'shortid'
import _ from 'lodash'

export const useCocktails = () => {
    // set up all the variables in state
    const [cocktails, setCocktails] = useState([])
    const [newCocktailIngredient, setNewCocktailIngredient] = useState({
        ingredient_name: '',
        parts: 0
    })
    const [addedCocktailIngredients, setAddedCocktailIngredients] = useState([])
    const [newCocktailName, setNewCocktailName] = useState('')
    const [addFlag, setFlag] = useState(false)
    const [editIngredientId, setEditIngredientId] = useState('')
    const [editCocktailId, setEditCocktailId] = useState('')
    const [cocktailSearch, setCocktailSearch] = useState('')
    const [filteredCocktails, setFilteredCocktails] = useState([])

    const loadCocktails = async () => {

        // for debugging, load list of default cocktails
        var default_cocktails = defaultCocktails()
        // return setCocktails(cocktails)



        const data = await AsyncStorage.getItem('cocktails')
        // console.log('data', data)
        if(data){
            var cocktails = JSON.parse(data)
            var unique = _.uniqBy([...cocktails, ...default_cocktails], 'name')
            setCocktails(unique) // change to _.uniq or something
        }
    }

    // debugging
    // useEffect(()=>{
    //     console.log('cocktail changes', newCocktailName, addedCocktailIngredients)
    // }, [newCocktailName])

    // load cocktails from storage
    useEffect(()=>{
        // console.log('loading cocktails', cocktails)
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

    useEffect(()=>{
        filterCocktails()
    }, [cocktailSearch, cocktails])

    function filterCocktails(){
        if(cocktailSearch == ''){
            return setFilteredCocktails([...cocktails])
        }
        var filtered = cocktails.filter(c=>{
            var match
            if(c.ingredients && c.ingredients.length > 0){
                c.ingredients.forEach(i=>{
                    if(i.ingredient_name.toLowerCase().includes(cocktailSearch.toLowerCase())){
                        match = true
                    }
                })
            }
            if(c.name.toLowerCase().includes(cocktailSearch.toLowerCase())){
                match = true
            }

            return match
        })

        setFilteredCocktails(filtered)
    }

    const addCocktail = (cocktail) => {
        // console.log('adding cocktail', editCocktailId)
        if(!editCocktailId){
            var cocktail = {
                id: generate(),
                name: newCocktailName,
                ingredients: addedCocktailIngredients
            }
            setCocktails([cocktail, ...cocktails])
        } else {
            var updated = cocktails.map(c=>{
                if(c.id == editCocktailId){
                    return {
                        id: editCocktailId,
                        name: newCocktailName,
                        ingredients: addedCocktailIngredients
                    }
                } else {
                    return c
                }
            })

            setCocktails([...updated])
        }
        
        resetNewCocktail()
    }

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

    // maybe not needed...
    function resetNewCocktail() {
        // console.log('resetting')
        setEditCocktailId('')
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

    function deleteCocktail(id){
        var updated = cocktails.filter(c=>c.id != id)

        setCocktails(updated)
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
        setNewCocktailIngredient,
        editCocktailIngredient,
        editIngredientId, 
        toggleEditIngredient,
        setEditCocktailId,
        deleteCocktail,
        cocktailSearch, 
        setCocktailSearch,
        filteredCocktails,
    }
}

export const useFunctionMenu = () =>{
    const [showFunctionMenu, setShowFunctionMenu] = useState(false)
    const [currentMode, setCurrentMode] = useState('')
    const [keyboardShowing, setKeyboardShowing] = useState(false)
    const [panel, setPanel] = useState(null)

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
        currentMode,
        keyboardShowing,
        setKeyboardShowing,
        panel, setPanel,
        setShowFunctionMenu
    }
}

export const useStock = () => {
    // for testing
    var default_stock = [
        {
            id: generate(),
            label: 'Rye',
            in_stock: true
        },
        {
            id: generate(),
            label: 'Gin',
            in_stock: true
        },
        {
            id: generate(),
            label: 'Sweet Vermouth',
            in_stock: true
        },
        {
            id: generate(),
            label: 'Rum',
            in_stock: false
        },
    ]

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
        // console.log('stock', data)

        if (data && data.length) {
            var stock = JSON.parse(data)
            setStock(stock)
        } else {
            setStock(default_stock)
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



function defaultCocktails(){
    return [
        {
            id: generate(),
            name: 'Martini',
            ingredients: [
                {
                    id: generate(),
                    ingredient_name: 'Gin',
                    parts: 1
                },
                {
                    id: generate(),
                    ingredient_name: 'Dry Vermouth',
                    parts: 1
                },
            ]
        },
        {
            id: generate(),
            name: 'Gin & Tonic',
            ingredients: [
                {
                    id: generate(),
                    ingredient_name: 'Gin',
                    parts: 1
                },
                {
                    id: generate(),
                    ingredient_name: 'Tonic',
                    parts: 2
                },
            ]
        },
        {
            id: generate(),
            name: 'Negroni',
            ingredients: [
                {
                    id: generate(),
                    ingredient_name: 'Gin',
                    parts: 1
                },
                {
                    id: generate(),
                    ingredient_name: 'Sweet Vermouth',
                    parts: 1
                },
                {
                    id: generate(),
                    ingredient_name: 'Campari',
                    parts: 1
                },
            ]
        },
        {
            id: generate(),
            name: 'Whiskey Sour',
            ingredients: [
                {
                    id: generate(),
                    ingredient_name: 'Rye',
                    parts: 2
                },
                {
                    id: generate(),
                    ingredient_name: 'Lemon Juice',
                    parts: .75
                },
                {
                    id: generate(),
                    ingredient_name: 'Simple Syrup',
                    parts: .5
                },
                {
                    id: generate(),
                    ingredient_name: 'Red Wine',
                    parts: 0
                },
            ]
        },
        {
            id: generate(),
            name: 'Boulevardier',
            ingredients: [
                {
                    id: generate(),
                    ingredient_name: 'Rye',
                    parts: 1
                },
                {
                    id: generate(),
                    ingredient_name: 'Sweet Vermouth',
                    parts: 1
                },
                {
                    id: generate(),
                    ingredient_name: 'Campari',
                    parts: 1
                },
            ]
        },
        {
            id: generate(),
            name: 'Manhatten',
            ingredients: [
                {
                    id: generate(),
                    ingredient_name: 'Rye',
                    parts: 2
                },
                {
                    id: generate(),
                    ingredient_name: 'Sweet Vermouth',
                    parts: 1
                },
                {
                    id: generate(),
                    ingredient_name: 'Angostura',
                    parts: 0
                },
            ]
        },
        {
            id: generate(),
            name: 'Last Word',
            ingredients: [
                {
                    id: generate(),
                    ingredient_name: 'Gin',
                    parts: 1
                },
                {
                    id: generate(),
                    ingredient_name: 'Lime Juice',
                    parts: 1
                },
                {
                    id: generate(),
                    ingredient_name: 'Green Chartreuse',
                    parts: 1
                },
                {
                    id: generate(),
                    ingredient_name: 'Maraschino Liquer',
                    parts: 1
                },
            ]
        },
        {
            id: generate(),
            name: 'Corpse Reviver #2',
            ingredients: [
                {
                    id: generate(),
                    ingredient_name: 'Gin',
                    parts: 1
                },
                {
                    id: generate(),
                    ingredient_name: 'Cocchi Americano',
                    parts: 1
                },
                {
                    id: generate(),
                    ingredient_name: 'Lemon Juice',
                    parts: 1
                },
                {
                    id: generate(),
                    ingredient_name: 'Cointreau',
                    parts: 1
                },
            ]
        },
        {
            id: generate(),
            name: 'Sidecar',
            ingredients: [
                {
                    id: generate(),
                    ingredient_name: 'Brandy',
                    parts: 1.5
                },
                {
                    id: generate(),
                    ingredient_name: 'Lemon Juice',
                    parts: .75
                },
                {
                    id: generate(),
                    ingredient_name: 'Cointreau',
                    parts: .75
                },
            ]
        },
        {
            id: generate(),
            name: 'French 75',
            ingredients: [
                {
                    id: generate(),
                    ingredient_name: 'Gin',
                    parts: 1
                },
                {
                    id: generate(),
                    ingredient_name: 'Lemon Juice',
                    parts: .5
                },
                {
                    id: generate(),
                    ingredient_name: 'Simple Syrup',
                    parts: .5
                },
                {
                    id: generate(),
                    ingredient_name: 'Champagne',
                    parts: 3
                },
            ]
        },
        {
            id: generate(),
            name: 'Vesper',
            ingredients: [
                {
                    id: generate(),
                    ingredient_name: 'Gin',
                    parts: 3
                },
                {
                    id: generate(),
                    ingredient_name: 'Vodka',
                    parts: 1
                },
                {
                    id: generate(),
                    ingredient_name: 'Cocchi Americano',
                    parts: .75
                },
            ]
        },
        {
            id: generate(),
            name: 'Sazerac',
            ingredients: [
                {
                    id: generate(),
                    ingredient_name: 'Rye',
                    parts: 1.5
                },
                {
                    id: generate(),
                    ingredient_name: 'Brandy',
                    parts: 1.5
                },
                {
                    id: generate(),
                    ingredient_name: 'Angostura',
                    parts: 0
                },
                {
                    id: generate(),
                    ingredient_name: 'Peychauds',
                    parts: 0
                },
                {
                    id: generate(),
                    ingredient_name: 'Absinthe',
                    parts: 0
                },
            ]
        },
        {
            id: generate(),
            name: 'Vieux Carre',
            ingredients: [
                {
                    id: generate(),
                    ingredient_name: 'Rye',
                    parts: .75
                },
                {
                    id: generate(),
                    ingredient_name: 'Sweet Vermouth',
                    parts: .75
                },
                {
                    id: generate(),
                    ingredient_name: 'Brandy',
                    parts: .75
                },
                {
                    id: generate(),
                    ingredient_name: 'Benedictine',
                    parts: .25
                },
            ]
        },
    ]
}