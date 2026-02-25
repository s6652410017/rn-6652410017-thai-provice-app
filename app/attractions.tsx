import { useEffect, useState } from 'react'
import { Image, Linking, Pressable, ScrollView, Text, View } from 'react-native'
import { supabase } from './lib/supabase'

export default function Attractions() {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const { data, error } = await supabase
      .from('attractions')
      .select('*')
      .eq('province_id', 'cdc221d2-310d-40ff-9fb2-0748e4d7d1d8')

    if (error) {
      console.log(error)
    } else {
      setData(data || [])
    }
  }

  const openMap = (lat: number, lng: number) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`
    Linking.openURL(url)
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#f4f6f8' }}
      contentContainerStyle={{ padding: 20 }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          marginBottom: 20,
          textAlign: 'center',
        }}
      >
        สถานที่ท่องเที่ยว
      </Text>

      {data.map((item) => (
        <View
          key={item.id}
          style={{
            backgroundColor: '#ffffff',
            padding: 15,
            borderRadius: 15,
            marginBottom: 15,
            elevation: 3,
          }}
        >
          {item.image && (
            <Image
              source={{ uri: item.image }}
              style={{
                width: '100%',
                height: 180,
                borderRadius: 10,
                marginBottom: 10,
              }}
            />
          )}

          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
            {item.name}
          </Text>

          <Text style={{ marginVertical: 5 }}>
            {item.address}
          </Text>

          <Pressable
            onPress={() => openMap(item.latitude, item.longitude)}
            style={{
              backgroundColor: '#007AFF',
              padding: 10,
              borderRadius: 10,
              alignItems: 'center',
              marginTop: 10,
            }}
          >
            <Text style={{ color: '#fff' }}>เปิดแผนที่</Text>
          </Pressable>
        </View>
      ))}
    </ScrollView>
  )
}