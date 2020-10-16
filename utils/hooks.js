import { useState, useEffect } from 'react'
import { AsyncStorage } from 'react-native'

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
        if(cocktails.length) return
        loadCocktails()
    }, [])

    useEffect(()=>{
        AsyncStorage.setItem('cocktails', JSON.stringify(cocktails))
    }, [cocktails])

    const addCocktail = (cocktail) =>{
        setCocktails([cocktail, ...cocktails])
    }

    return {cocktails, addCocktail}
}