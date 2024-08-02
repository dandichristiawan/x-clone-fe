import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import pen from '@/assets/pen.svg';

export const FloatingButton = () => {
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => navigate('/create-post/mobile')}
      className="fixed bottom-[80px] right-5 bg-[#1d9bf0] text-white p-4 h-14 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-opacity-75 md:hidden"
    >
      <img src={pen} alt="" width={30} height={30} />
    </Button>
  );
};
