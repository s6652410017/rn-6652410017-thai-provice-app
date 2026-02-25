import { Stack, useRouter } from 'expo-router'
import { Pressable, ScrollView, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Province() {
  const router = useRouter()

  const menu = [
    { title: '🏖 สถานที่ท่องเที่ยว', route: 'attractions' },
    { title: '🍜 ร้านอาหาร', route: 'restaurants' },
    { title: '☕ คาเฟ่', route: 'cafes' },
    { title: '🛕 วัด/ศาสนสถาน', route: 'temples' },
    { title: '🎉 งานประเพณี', route: 'festival' },
  ]

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
        <Pressable
          onPress={() => router.back()}
          style={{ marginBottom: 20 }}
        >
          <Text
            style={{
              color: '#3b82f6',
              fontSize: 16,
              fontWeight: '600',
            }}
          >
            ← ย้อนกลับ
          </Text>
        </Pressable>

        <Text
          style={{
            fontSize: 28,
            fontWeight: 'bold',
            marginBottom: 30,
            textAlign: 'center',
            color: '#ffffff',
          }}
        >
          จังหวัดเลย
        </Text>

        {menu.map((item, index) => (
          <Pressable
            key={index}
            onPress={() =>
              router.push({
                pathname: '/category/[category]',
                params: { category: item.route },
              })
            }
            style={{
              backgroundColor: '#1e293b',
              padding: 20,
              borderRadius: 20,
              marginBottom: 15,
              elevation: 6,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: '#ffffff',
                fontWeight: '600',
              }}
            >
              {item.title}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}