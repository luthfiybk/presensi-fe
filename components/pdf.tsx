import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "@react-pdf-viewer/core/lib/styles/index.css";

interface PDFReaderProps {
    fileUrl: string
}

export default function PDFReader({ fileUrl }: PDFReaderProps) {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    return (
        <>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.js">
                <div style={{ height: '50%' }}>
                    <Viewer
                        fileUrl={fileUrl}
                        plugins={[defaultLayoutPluginInstance]}
                    />
                </div>
            </Worker>
        </>
    );
}
