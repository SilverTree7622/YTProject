import Component from "@src/util/Component";

const PageConfig = {
    name: 'page-element',
    inner: `
        page main testing
    `,
};

class PageMain extends Component {
    static state = {
        title: <string> '메인 페이지',
        list: <{ title: string, popUp: string }[]> [],
    };

    static init(): string {
        console.log('page main init');
        this.setName('page main');
        this.setState({
            list: [
                { title: '폼_미쳤다.ts', popUp: 'https://www.naver.com' },

            ]
        });
        const { list } = this.state;
        this.addEvt('show', () => {
            console.log('show evt called');
        });
        return `
            <div onclick='console.dir(this); console.log(this.component);' class='bg-indigo-800 text-white text-center font-bold rounded-lg border shadow-lg p-2'>
                ${this.state.title}
            </div>
            <div class="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
                ${list.map((item, idx) => {
                    return `
                        <div class='group relative'>
                            <button
                                onclick='console.dir(this); console.log(this.component);';
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal${idx}"
                                class="relative h-80 w-full overflow-hidden rounded-lg text-white bg-black group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1"
                            >
                                ${item.title}
                            </button>
                        </div>

                        <!-- Button trigger modal -->
                        <div id="exampleModal${idx}" tabindex="-1" class="hidden modal fade relative z-10" aria-labelledby="exampleModalLabel${idx}" aria-hidden="true">
                            <div class="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block"></div>
                            <div class="fixed inset-0 z-10 overflow-y-auto">
                                <div class="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
                                    <div class="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                                        <div class="relative flex w-full items-center overflow-hidden bg-white px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                                            ${item.title}
                                            <button type="button" data-bs-dismiss="modal" class="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8">
                                                <span class="sr-only">Close</span>
                                                <!-- Heroicon name: outline/x-mark -->
                                                <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button> 
                                            <div class="grid w-full grid-cols-1 items-start gap-y-8 gap-x-6 sm:grid-cols-12 lg:gap-x-8">
                                                <div class="aspect-w-2 aspect-h-3 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                                                    <img src="https://tailwindui.com/img/ecommerce-images/product-quick-preview-02-detail.jpg" alt="Two each of gray, white, and black shirts arranged on table." class="object-cover object-center">
                                                </div>
                                                
                                                <div class="sm:col-span-8 lg:col-span-7">
                                                    <h2 class="text-2xl font-bold text-gray-900 sm:pr-12">Basic Tee 6-Pack</h2>
                                                    <section aria-labelledby="information-heading" class="mt-2">
                                                        <h3 id="information-heading" class="sr-only">Product information</h3>
                                                        <p class="text-2xl text-gray-900">$192</p>
                                                        
                                                    </section>
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                })}
            </div>
        `;
    }
}


export default PageConfig;