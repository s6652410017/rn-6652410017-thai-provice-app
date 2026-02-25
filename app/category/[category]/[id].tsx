import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import {
    ActivityIndicator,
    Image,
    Linking,
    Pressable,
    ScrollView,
    Text,
    View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { supabase } from '../../lib/supabase'

export default function Detail() {
  const { category, id } = useLocalSearchParams()
  const router = useRouter()

  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!category || !id) return

    const fetchDetail = async () => {
      const { data, error } = await supabase
        .from(category as string)
        .select('*')
        .eq('id', id)
        .single()

      if (!error) setData(data)
      setLoading(false)
    }

    fetchDetail()
  }, [category, id])

  const openMap = () => {
    if (!data?.latitude || !data?.longitude) {
      alert('ไม่มีพิกัดแผนที่')
      return
    }

    const url = `https://www.google.com/maps/search/?api=1&query=${data.latitude},${data.longitude}`
    Linking.openURL(url)
  }

  if (loading) {
    return (
      <SafeAreaView style={{ flex:1, backgroundColor:'#0f172a', justifyContent:'center', alignItems:'center' }}>
        <Stack.Screen options={{ headerShown: false }} />
        <ActivityIndicator size="large" color="#3b82f6" />
      </SafeAreaView>
    )
  }

  if (!data) {
    return (
      <SafeAreaView style={{ flex:1, backgroundColor:'#0f172a', justifyContent:'center', alignItems:'center' }}>
        <Stack.Screen options={{ headerShown: false }} />
        <Text style={{ color:'#ffffff' }}>ไม่พบข้อมูล</Text>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={{ flex:1, backgroundColor:'#0f172a' }}>
      
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView
        contentContainerStyle={{
          padding:20,
          paddingBottom:120
        }}
        showsVerticalScrollIndicator={false}
      >
        <Pressable onPress={() => router.back()}>
          <Text style={{ color:'#3b82f6', marginBottom:15, fontWeight:'600' }}>
            ← ย้อนกลับ
          </Text>
        </Pressable>

        {data.image && (
          <Image
            source={{ uri: data.image }}
            style={{
              width:'100%',
              height:220,
              borderRadius:20,
              marginBottom:20
            }}
            resizeMode="cover"
          />
        )}

        <View
          style={{
            backgroundColor:'#1e293b',
            padding:20,
            borderRadius:20,
            marginBottom:20
          }}
        >
          <Text
            style={{
              fontSize:24,
              fontWeight:'bold',
              marginBottom:10,
              color:'#ffffff'
            }}
          >
            {data.name}
          </Text>

          {data.address && (
            <Text style={{ color:'#cbd5e1', marginBottom:10 }}>
              {data.address}
            </Text>
          )}
        </View>

        <Pressable
          onPress={openMap}
          style={{
            backgroundColor:'#3b82f6',
            paddingVertical:18,
            borderRadius:30,
            alignItems:'center'
          }}
        >
          <Text style={{ color:'#ffffff', fontWeight:'bold', fontSize:16 }}>
            เปิดใน Google Maps
          </Text>
        </Pressable>

      </ScrollView>
    </SafeAreaView>
  )
}