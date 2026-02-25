import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import {
    ActivityIndicator,
    Image,
    Pressable,
    ScrollView,
    Text,
    View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { supabase } from '../lib/supabase'

export default function CategoryDetail() {
  const { category } = useLocalSearchParams()
  const router = useRouter()

  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!category) return

    const fetchData = async () => {
      setLoading(true)

      const { data, error } = await supabase
        .from(category as string)
        .select('*')

      if (error) {
        console.log('Supabase Error:', error)
        setLoading(false)
        return
      }

      setData(data || [])
      setLoading(false)
    }

    fetchData()
  }, [category])

  if (loading) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#0f172a',
        }}
      >
        <ActivityIndicator size="large" color="#3b82f6" />
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0f172a' }}>
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView
        contentContainerStyle={{
          padding: 20,
          paddingBottom: 120, 
        }}
        showsVerticalScrollIndicator={false}
      >
        <Pressable onPress={() => router.back()}>
          <Text
            style={{
              color: '#3b82f6',
              marginBottom: 20,
              fontWeight: '600',
            }}
          >
            ← ย้อนกลับ
          </Text>
        </Pressable>

        <Text
          style={{
            fontSize: 22,
            fontWeight: 'bold',
            color: '#ffffff',
            marginBottom: 20,
          }}
        >
          หมวดหมู่: {category}
        </Text>

        {data.length === 0 && (
          <Text style={{ color: '#94a3b8' }}>
            ไม่มีข้อมูลในหมวดนี้
          </Text>
        )}

        {data.map((item: any) => (
          <Link
            key={item.id}
            href={`/category/${category}/${item.id}`}
            asChild
          >
            <Pressable
              style={{
                backgroundColor: '#1e293b',
                borderRadius: 20,
                marginBottom: 20,
                overflow: 'hidden',
                elevation: 5,
              }}
            >
              {item.image && (
                <Image
                  source={{ uri: item.image }}
                  style={{
                    width: '100%',
                    height: 180,
                  }}
                  resizeMode="cover"
                />
              )}

              <View style={{ padding: 15 }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '600',
                    color: '#ffffff',
                  }}
                >
                  {item.name}
                </Text>
              </View>
            </Pressable>
          </Link>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}