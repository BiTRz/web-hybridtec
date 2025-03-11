import { StatusBar } from 'expo-status-bar';
import { Button, SafeAreaView, StyleSheet, Text, TextInput, View, ScrollView } from 'react-native';
import { addDoc, collection, firestore, serverTimestamp, query, onSnapshot, deleteDoc, doc, ITEMS } from './firebase/Config';
import { use, useState, useEffect } from 'react';

export default function App() {
  const [items, setItems] = useState([])
  const [newItem, setNewItem] = useState('')

  useEffect(() => {
    const q = query(collection(firestore, ITEMS))
    const unsubscribe = onSnapshot(q,(querySnapshot) => {
      const tempItems = []
      querySnapshot.forEach((doc) => {
        console.log(doc.id)
        tempItems.push({...doc.data(),id: doc.id})
      })
      setItems(tempItems)
    })
    return () => {
      unsubscribe()
    }
  }, [])

  const saveItem = async () => {
    if (newItem.trim()) {
      await addDoc(collection(firestore, ITEMS), {
        text: newItem,
        created: serverTimestamp()
      }).catch(error => console.log(error));
      setNewItem('');
      console.log('Item saved.');
    }
  };

  const removeItem = async (id) => {
    await deleteDoc(doc(firestore, ITEMS, id)).catch(error => console.log(error));
    console.log('Item removed.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <TextInput
          placeholder="Add new item..."
          value={newItem}
        onChangeText={text => setNewItem(text)}
        style={styles.input}
        />
        <Button title="Add" onPress={saveItem} />
    </View>
    <ScrollView>
      {
        items.map((item) => (
          <View key={item.id} style={styles.item}>
            <Text>{item.text}</Text>
            <Button title="Remove" onPress={() => removeItem(item.id)} />
          </View>
        ))
      }
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: 8
  },
  form: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 16,
    marginTop: 16
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 20,
    padding: 10,
    flex: 1,
    marginRight: 10,
  },
  item: {
    margin: 10,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5
  }
});
