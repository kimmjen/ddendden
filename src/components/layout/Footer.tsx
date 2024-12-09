import Link from 'next/link';

export const Footer = () => {
    return (
        <footer className="bg-white mt-auto">
            <div className="max-w-6xl mx-auto py-8 px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-lg font-bold mb-4">뜬뜬</h3>
                        <p className="text-gray-600 mb-4">
                            좋은 사람, 좋은 이야기, 좋은 후기, 우리 뜬뜬한 사이 돼요💕
                        </p>
                        <div className="space-y-2">
                            <div>
                                <span className="text-gray-500">주소:</span>
                                <span className="text-gray-600 ml-2">서울특별시 강남구</span>
                            </div>
                            <div>
                                <span className="text-gray-500">이메일:</span>
                                <a href="mailto:contact@ddeun.com" className="text-gray-600 ml-2 hover:text-pink-500">
                                    contact@ddeun.com
                                </a>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold mb-4">바로가기</h3>
                        <div className="space-y-2">
                            <div><Link href="/pinggo" className="text-gray-600 hover:text-pink-500">핑계고</Link></div>
                            <div><Link href="/mini" className="text-gray-600 hover:text-pink-500">MINI 핑계</Link></div>
                            <div><Link href="/monthly" className="text-gray-600 hover:text-pink-500">이달의 계원</Link></div>
                            <div><Link href="/awards" className="text-gray-600 hover:text-pink-500">시상식</Link></div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold mb-4">도움말</h3>
                        <div className="space-y-2">
                            <div><Link href="/faq" className="text-gray-600 hover:text-pink-500">자주 묻는 질문</Link></div>
                            <div><Link href="/terms" className="text-gray-600 hover:text-pink-500">이용약관</Link></div>
                            <div><Link href="/privacy" className="text-gray-600 hover:text-pink-500">개인정보처리방침</Link></div>
                            <div><Link href="/guidelines" className="text-gray-600 hover:text-pink-500">커뮤니티 가이드라인</Link></div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold mb-4">제작진</h3>
                        <div className="space-y-2">
                            <p className="text-gray-600">MC: 뜬뜬</p>
                            <p className="text-gray-600">PD: 뜬디</p>
                            <div className="mt-4">
                                <h4 className="font-medium text-gray-700 mb-2">팔로우하기</h4>
                                <div className="space-y-2">
                                    <div><a href="https://instagram.com/ddeun._ddeun" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-pink-500">Instagram</a></div>
                                    <div><a href="https://www.youtube.com/@DdeunDdeun" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-pink-500">YouTube</a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t mt-8 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
                        <div className="mb-4 md:mb-0">
                            © 2024 뜬뜬. All rights reserved.
                        </div>
                        <div className="flex space-x-4">
                            <Link href="/faq" className="hover:text-pink-500">FAQ</Link>
                            <Link href="/contact" className="hover:text-pink-500">제휴/협력 문의</Link>
                            <Link href="/support" className="hover:text-pink-500">고객지원</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};