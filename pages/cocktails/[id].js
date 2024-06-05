import { useRouter } from 'next/router';
import CocktailDetails from '../../components/cards/CocktailDetails';

export default function CocktailDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <CocktailDetails cocktailId={id} />
  );
}
