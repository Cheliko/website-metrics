declare module './sample.json' {
    interface DataEntry {
      timestamp: string;
      impressions: number;
      clicks: number;
      cost: number;
      conversions: number;
    }
  
    interface SampleData {
      title: string;
      data: DataEntry[];
    }
  
    const value: SampleData;
    export default value;
  }
  