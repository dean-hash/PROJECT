import axios from 'axios';
import CryptoJS from 'crypto-js';

const API_BASE_URL = 'https://api.shareasale.com/w.cfm';

interface ShareASaleProduct {
  productId: string;
  name: string;
  description: string;
  price: number;
  merchantId: string;
  merchantName: string;
  category: string;
  imageUrl: string;
  affiliateLink: string;
}

class ShareASaleApi {
  private apiToken: string;
  private apiSecret: string;
  private affiliateId: string;

  constructor() {
    this.apiToken = import.meta.env.VITE_SHAREASALE_API_TOKEN;
    this.apiSecret = import.meta.env.VITE_SHAREASALE_API_SECRET;
    this.affiliateId = import.meta.env.VITE_SHAREASALE_AFFILIATE_ID;
  }

  private getSignature(timestamp: string): string {
    const signatureString = `${this.apiToken}:${timestamp}:${this.affiliateId}:${this.apiSecret}`;
    return CryptoJS.SHA256(signatureString).toString(CryptoJS.enc.Hex);
  }

  async searchProducts(query: string): Promise<ShareASaleProduct[]> {
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const signature = this.getSignature(timestamp);

    try {
      const response = await axios.get(API_BASE_URL, {
        params: {
          action: 'getProducts',
          version: '2.3',
          affiliateId: this.affiliateId,
          token: this.apiToken,
          timestamp,
          signature,
          xmlFormat: 1,
          keyword: query,
          sortCol: 'relevance',
          sortDir: 'desc',
          rows: 20,
        },
      });

      // Parse XML response and convert to ShareASaleProduct[]
      // This is a simplified example, you'll need to implement proper XML parsing
      const products: ShareASaleProduct[] = response.data.products.map((product: any) => ({
        productId: product.productId,
        name: product.name,
        description: product.description,
        price: parseFloat(product.price),
        merchantId: product.merchantId,
        merchantName: product.merchantName,
        category: product.category,
        imageUrl: product.imageUrl,
        affiliateLink: product.buyUrl,
      }));

      return products;
    } catch (error) {
      console.error('Error fetching products from ShareASale:', error);
      throw error;
    }
  }
}

export const shareASaleApi = new ShareASaleApi();