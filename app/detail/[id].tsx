import { useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { ActivityIndicator, Image, ScrollView, Text, View } from 'react-native'
import { supabase } from '../lib/supabase'

export default function CategoryPage() {
  const { id } = useLocalSearchParams()
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return

    const fetchData = async () => {
      setLoading(true)

      const { data, error } = await supabase
        .from(id as string)  
        .select('*')

      if (error) {
        console.log(error)
      } else {
        setData(data || [])
      }

      setLoading(false)
    }

    fetchData()
  }, [id])

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
        หมวด: {id}
      </Text>

      {data.map((item: any) => (
        <View
          key={item.id}
          style={{
            marginBottom: 20,
            backgroundColor: '#fff',
            padding: 15,
            borderRadius: 12,
            elevation: 3
          }}
        >
          {item.image && (
            <Image
              source={{ uri: item.image }}
              style={{
                width: '100%',
                height: 180,
                borderRadius: 10,
                marginBottom: 10
              }}
            />
          )}

          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
            {item.name}
          </Text>

          {item.description && (
            <Text style={{ marginTop: 5 }}>
              {item.description}
            </Text>
          )}
        </View>
      ))}
    </ScrollView>
  )
}