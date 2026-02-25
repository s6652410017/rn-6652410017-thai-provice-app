import { Stack, useRouter } from 'expo-router'
import { Pressable, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Home() {
  const router = useRouter()

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0f172a' }}>
      <Stack.Screen options={{ headerShown: false }} />

      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 25,
        }}
      >
        <Text
          style={{
            fontSize: 32,
            fontWeight: 'bold',
            color: '#ffffff',
            marginBottom: 15,
            textAlign: 'center',
          }}
        >
          🌏 แอปแนะนำสถานที่ท่องเที่ยว
        </Text>

        <Text
          style={{
            fontSize: 16,
            color: '#cbd5e1',
            textAlign: 'center',
            marginBottom: 40,
          }}
        >
          สถานที่ท่องเที่ยว ร้านอาหาร และคาเฟ่ในจังหวัดเลย
        </Text>

        <Pressable
          onPress={() => router.push('/provice')}
          style={{
            backgroundColor: '#3b82f6',
            paddingVertical: 18,
            paddingHorizontal: 60,
            borderRadius: 30,
            elevation: 8,
          }}
        >
          <Text
            style={{
              color: '#ffffff',
              fontSize: 18,
              fontWeight: 'bold',
            }}
          >
            เข้าสู่จังหวัดเลย →
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}