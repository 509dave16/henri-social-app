import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { Icon } from 'material-bread'

import { Contacts, Feed, Todos } from '../screens'

const ContactsStack = createStackNavigator()

function ContactsStackScreen() {
  return (
    <ContactsStack.Navigator>
      <ContactsStack.Screen name="Contacts" component={Contacts} options={{ headerTitle: 'Contacts' }} />
    </ContactsStack.Navigator>
  )
}

const ContactsTabIcon = ({ color, size, focused }) => <Icon name="phone" color={color} size={size} />

const FeedStack = createStackNavigator()

function FeedStackScreen() {
  return (
    <FeedStack.Navigator>
      <FeedStack.Screen name="Feed" component={Feed} options={{ headerTitle: 'Feed' }} />
    </FeedStack.Navigator>
  )
}

const FeedTabIcon =  ({ color, size, focused }) => <Icon name="rss-feed" color={color} size={size} />

const TodosStack = createStackNavigator()

function TodosStackScreen() {
  return (
    <TodosStack.Navigator>
      <TodosStack.Screen name="Todos" component={Todos} options={{ headerTitle: 'Todos' }} />
    </TodosStack.Navigator>
  )
}

const TodosTabIcon = ({ color, size, focused }) => <Icon name="playlist-add-check" color={color} size={size} />

const Tab = createBottomTabNavigator()

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Contacts" component={ContactsStackScreen} options={{ tabBarIcon: ContactsTabIcon }} />
        <Tab.Screen name="Feed" component={FeedStackScreen} options={{ tabBarIcon: FeedTabIcon }} />
        <Tab.Screen name="Todos" component={TodosStackScreen} options={{ tabBarIcon: TodosTabIcon }} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}