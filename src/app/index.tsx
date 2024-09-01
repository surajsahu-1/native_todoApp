import { View, Text } from 'react-native'
import React from 'react'
import Counter from '@/components/Counter'
import ToDo from '@/components/ToDo'
import ToDoInLocalStorage from '@/components/ToDoInLocalStorage'

const index = () => {
  return (
    <View >
     {/* <Counter/> */}
     {/* <ToDo/> */}
     <ToDoInLocalStorage/>
    </View>
  )
}

export default index