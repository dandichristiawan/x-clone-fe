import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

export const FloatingButton = () => {
    const navigate = useNavigate()
    return (
        <Button
            onClick={() => navigate('/create-post/mobile')}
            className="fixed bottom-16 right-5 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 md:hidden"
        >
            Tweet
        </Button>
    )
}
