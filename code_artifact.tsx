import React, { useState, useEffect } from 'react';
import { MessageSquare, Settings, X, Trash2, Plus, ArrowLeft, Store } from 'lucide-react';

const DEFAULT_FORTUNES = [
  "오늘은 뜻밖의 행운이 찾아오는 기분 좋은 하루가 될 것입니다.",
  "당신의 작은 배려가 누군가에게 큰 감동을 주는 날입니다.",
  "오랫동안 고민하던 문제가 실마리를 찾게 될 것입니다.",
  "새로운 도전을 시작하기에 완벽한 타이밍입니다. 자신감을 가지세요!",
  "오늘은 무리하지 말고 잠시 쉬어가는 여유가 필요한 하루입니다."
];

const MARKET_ITEMS = [
  { id: 1, icon: "🍀", name: "네잎클로버 책갈피", price: "5,000원", desc: "책 사이에 꽂아두면 행운이 찾아옵니다." },
  { id: 2, icon: "✨", name: "행운의 별가루 병", price: "12,000원", desc: "반짝이는 긍정 에너지를 담았습니다." },
  { id: 3, icon: "🐷", name: "황금 돼지 조각상", price: "30,000원", desc: "재물운을 크게 불러옵니다." },
  { id: 4, icon: "🕯️", name: "소원 성취 캔들", price: "15,000원", desc: "불을 켜면 소원이 이루어집니다." },
  { id: 5, icon: "🧂", name: "액막이 핑크 소금", price: "8,000원", desc: "나쁜 기운을 물리쳐 줍니다." },
  { id: 6, icon: "👛", name: "재물운 빨간 지갑", price: "45,000원", desc: "돈이 마르지 않는 마법의 지갑." },
  { id: 7, icon: "🧶", name: "운명의 붉은 실", price: "10,000원", desc: "좋은 인연을 만나게 해줍니다." },
  { id: 8, icon: "📜", name: "만사형통 부적", price: "20,000원", desc: "중요한 시험이나 면접에 꼭 필요합니다." },
  { id: 9, icon: "🔮", name: "힐링 자수정", price: "35,000원", desc: "마음의 평화와 행운을 동시에." },
];

export default function FortuneApp() {
  // State Management
  const [view, setView] = useState('main'); // 'main' | 'fortune'
  const [currentFortune, setCurrentFortune] = useState('');
  
  const [fortunes, setFortunes] = useState([]);
  const [reviews, setReviews] = useState([]);
  
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isDevOpen, setIsDevOpen] = useState(false);
  const [isMarketOpen, setIsMarketOpen] = useState(false);
  
  const [newReviewText, setNewReviewText] = useState('');
  const [newFortuneText, setNewFortuneText] = useState('');

  // Initialize data from localStorage on mount
  useEffect(() => {
    const savedFortunes = localStorage.getItem('fortune-app-fortunes');
    const savedReviews = localStorage.getItem('fortune-app-reviews');

    if (savedFortunes) {
      setFortunes(JSON.parse(savedFortunes));
    } else {
      setFortunes(DEFAULT_FORTUNES);
      localStorage.setItem('fortune-app-fortunes', JSON.stringify(DEFAULT_FORTUNES));
    }

    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    }
  }, []);

  // Save fortunes to localStorage
  const saveFortunes = (updatedFortunes) => {
    setFortunes(updatedFortunes);
    localStorage.setItem('fortune-app-fortunes', JSON.stringify(updatedFortunes));
  };

  // Save reviews to localStorage
  const saveReviews = (updatedReviews) => {
    setReviews(updatedReviews);
    localStorage.setItem('fortune-app-reviews', JSON.stringify(updatedReviews));
  };

  // Actions
  const handleShowFortune = () => {
    if (fortunes.length === 0) {
      alert("등록된 운세가 없습니다. 개발자 모드에서 추가해주세요.");
      return;
    }
    const randomIndex = Math.floor(Math.random() * fortunes.length);
    setCurrentFortune(fortunes[randomIndex]);
    setView('fortune');
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReviewText.trim()) return;
    
    const newReview = {
      id: Date.now(),
      text: newReviewText,
      date: new Date().toLocaleDateString('ko-KR')
    };
    saveReviews([newReview, ...reviews]);
    setNewReviewText('');
  };

  const handleAddFortune = (e) => {
    e.preventDefault();
    if (!newFortuneText.trim()) return;
    
    saveFortunes([newFortuneText, ...fortunes]);
    setNewFortuneText('');
  };

  const handleDeleteFortune = (indexToDelete) => {
    const updatedFortunes = fortunes.filter((_, index) => index !== indexToDelete);
    saveFortunes(updatedFortunes);
  };

  const handleDeleteReview = (idToDelete) => {
    const updatedReviews = reviews.filter(review => review.id !== idToDelete);
    saveReviews(updatedReviews);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 text-slate-800 font-sans overflow-hidden flex flex-col items-center justify-center">
      
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>

      {/* Main Content Area */}
      <div className="relative z-10 w-full max-w-md p-6 flex flex-col items-center min-h-[400px]">
        {/* Title */}
        <h1 className="text-4xl font-bold tracking-tight text-indigo-900 mb-12 text-center drop-shadow-sm">
          오늘의 운세
        </h1>

        {/* View Transition Area */}
        <div className="flex-1 flex flex-col items-center justify-center w-full">
          {view === 'main' ? (
            <button
              onClick={handleShowFortune}
              className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full hover:from-indigo-600 hover:to-purple-700 hover:shadow-lg hover:shadow-purple-500/30 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              <span className="text-xl">운세 확인하기</span>
              <div className="absolute inset-0 h-full w-full rounded-full border-2 border-white/20"></div>
            </button>
          ) : (
            <div className="flex flex-col items-center animate-in fade-in zoom-in duration-500 w-full">
              <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/50 mb-8 w-full text-center">
                <p className="text-sm font-semibold text-indigo-500 mb-4 tracking-wide">
                  {new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                <p className="text-xl leading-relaxed text-slate-700 font-medium">
                  "{currentFortune}"
                </p>
              </div>
              <button
                onClick={() => setView('main')}
                className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-slate-600 transition-colors bg-white/50 rounded-full hover:bg-white hover:text-indigo-600 shadow-sm"
              >
                <ArrowLeft size={16} />
                돌아가기
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Floating Buttons */}
      <div className="fixed bottom-6 left-6 z-20">
        <button
          onClick={() => setIsReviewOpen(true)}
          className="flex items-center justify-center w-14 h-14 bg-white text-indigo-600 rounded-full shadow-lg hover:bg-indigo-50 hover:scale-110 transition-all duration-200 border border-indigo-100"
          title="리뷰 보기"
        >
          <MessageSquare size={24} />
        </button>
      </div>

      <div className="fixed top-6 right-6 z-20">
        <button
          onClick={() => setIsDevOpen(true)}
          className="flex items-center justify-center w-14 h-14 bg-slate-800 text-slate-200 rounded-full shadow-lg hover:bg-slate-700 hover:scale-110 transition-all duration-200"
          title="개발자 모드"
        >
          <Settings size={24} />
        </button>
      </div>

      <div className="fixed bottom-6 right-6 z-20">
        <button
          onClick={() => setIsMarketOpen(true)}
          className="flex items-center justify-center w-14 h-14 bg-yellow-400 text-yellow-900 rounded-full shadow-lg hover:bg-yellow-300 hover:scale-110 transition-all duration-200 border border-yellow-200"
          title="행운 마켓"
        >
          <Store size={24} />
        </button>
      </div>

      {/* Review Modal */}
      {isReviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
            <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <MessageSquare className="text-indigo-500" /> 사용자 리뷰
              </h2>
              <button onClick={() => setIsReviewOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50">
              {reviews.length === 0 ? (
                <div className="text-center text-slate-400 py-10">
                  첫 번째 리뷰를 남겨주세요!
                </div>
              ) : (
                reviews.map((review) => (
                  <div key={review.id} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex justify-between items-start group">
                    <div>
                      <p className="text-slate-700 text-sm">{review.text}</p>
                      <span className="text-xs text-slate-400 mt-2 block">{review.date}</span>
                    </div>
                    <button 
                      onClick={() => handleDeleteReview(review.id)}
                      className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="p-4 bg-white border-t border-slate-100">
              <form onSubmit={handleAddReview} className="flex gap-2">
                <input
                  type="text"
                  value={newReviewText}
                  onChange={(e) => setNewReviewText(e.target.value)}
                  placeholder="따뜻한 리뷰를 남겨주세요..."
                  className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
                <button 
                  type="submit"
                  disabled={!newReviewText.trim()}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  등록
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Market Modal */}
      {isMarketOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-50 w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-white">
              <h2 className="text-xl font-bold flex items-center gap-2 text-yellow-600">
                <Store className="text-yellow-600" /> 행운 마켓
              </h2>
              <button onClick={() => setIsMarketOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {MARKET_ITEMS.map((item) => (
                  <div key={item.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all flex flex-col items-center text-center group cursor-pointer">
                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                    <h3 className="font-bold text-slate-800 mb-1">{item.name}</h3>
                    <p className="text-yellow-600 font-semibold mb-3">{item.price}</p>
                    <p className="text-sm text-slate-500 flex-1">{item.desc}</p>
                    <button className="mt-4 w-full py-2 bg-yellow-100 text-yellow-700 font-medium rounded-xl hover:bg-yellow-400 hover:text-yellow-900 transition-colors" onClick={(e) => { e.stopPropagation(); alert(`'${item.name}' 구매 기능은 데모 버전입니다.`); }}>
                      구매하기
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Developer Modal */}
      {isDevOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
            <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <Settings className="text-slate-500" /> 개발자 모드 (운세 관리)
              </h2>
              <button onClick={() => setIsDevOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-3 bg-slate-50">
              <h3 className="text-sm font-semibold text-slate-500 mb-2">등록된 운세 목록</h3>
              {fortunes.length === 0 ? (
                <div className="text-center text-slate-400 py-4">등록된 운세가 없습니다.</div>
              ) : (
                fortunes.map((fortune, index) => (
                  <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex justify-between items-center group">
                    <p className="text-slate-700 text-sm flex-1 mr-4">{fortune}</p>
                    <button 
                      onClick={() => handleDeleteFortune(index)}
                      className="text-slate-300 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="p-4 bg-white border-t border-slate-100">
              <form onSubmit={handleAddFortune} className="flex gap-2">
                <input
                  type="text"
                  value={newFortuneText}
                  onChange={(e) => setNewFortuneText(e.target.value)}
                  placeholder="새로운 운세 문장을 입력하세요..."
                  className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
                <button 
                  type="submit"
                  disabled={!newFortuneText.trim()}
                  className="px-6 py-3 bg-slate-800 text-white rounded-xl font-medium hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
                >
                  추가
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
      
      {/* Custom Styles for Tailwind arbitrary animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}} />
    </div>
  );
}