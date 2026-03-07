import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import { fetchReports } from "./supabase/supabase";
import { useQuery } from "@tanstack/react-query";
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
)

const Map = () => {
    const BG_DARK = "#123524";
    const TEXT_LIGHT = "#EFE3C2";
    const ACCENT = "#85A947";
    const ACTIVE_BG = "#3E7B27";


    const { data: reports = [], isLoading, error, isFetching } = useQuery({
        queryKey: ["reports"],
        queryFn: fetchReports,
    });


    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: BG_DARK, color: TEXT_LIGHT }}>
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 mx-auto mb-4" style={{ borderColor: ACCENT }}></div>
                    <p className="text-xl">Loading pollution reports...</p>
                </div>
            </div>
        );
    }


    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: BG_DARK, color: TEXT_LIGHT }}>
                <div className="text-center">
                    <p className="text-xl text-red-400 mb-4">Error loading reports</p>
                    <p className="text-sm opacity-70">{error.message}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-h-screen p-6" style={{ backgroundColor: BG_DARK, color: TEXT_LIGHT }}>
            <style>{`
    .custom-scrollbar {
        scrollbar-width: thin;
        scrollbar-color: ${ACCENT} transparent;
    }

    .custom-scrollbar::-webkit-scrollbar {
        width: 8px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
        background: transparent;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
        background: ${ACCENT};
        border-radius: 10px;
    }


    .custom-marker-icon {
        background: transparent !important;
        border: none !important;
    }

    .leaflet-popup-content-wrapper {
        background: white;
        border-radius: 12px;
        box-shadow: 0 8px 24px rgba(0,0,0,0.2);
    }

    .leaflet-popup-tip {
        background: white;
    }
`}</style>


            {isFetching && !isLoading && (
                <div className="fixed top-4 right-4 z-50 bg-green-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    <span className="text-sm font-medium">Refreshing...</span>
                </div>
            )}

            <div className="max-w-[1600px] mx-auto h-full">
                <div className="flex gap-6 h-[calc(100vh-8rem)]">
                    <div className="flex-[0_0_60%] h-full">
                        <div className="h-full rounded-2xl overflow-hidden border-4 shadow-2xl" style={{ borderColor: ACCENT }}>
                            <MapContainer
                                center={[22.5937, 78.9629]}
                                zoom={4}
                                scrollWheelZoom={true}
                                style={{ height: "100%", width: "100%" }}
                            >
                                <TileLayer
                                    attribution='&copy; OpenStreetMap contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                {reports.map((report) => {
                                    const imageUrl = supabase.storage
                                        .from("jani-images")
                                        .getPublicUrl(report.public_image_url)
                                        .data.publicUrl;

                                    const customIcon = L.divIcon({
                                        html: `
                                            <div style="
                                                width: 60px;
                                                height: 60px;
                                                border-radius: 50%;
                                                overflow: hidden;
                                                border: 3px solid #85A947;
                                                box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                                                background: white;
                                                cursor: pointer;
                                                transition: transform 0.2s;
                                            "
                                            onmouseover="this.style.transform='scale(1.1)'"
                                            onmouseout="this.style.transform='scale(1)'"
                                            >
                                                <img 
                                                    src="${imageUrl}" 
                                                    alt="Pollution" 
                                                    style="
                                                        width: 100%;
                                                        height: 100%;
                                                        object-fit: cover;
                                                    "
                                                />
                                            </div>
                                        `,
                                        className: 'custom-marker-icon',
                                        iconSize: [60, 60],
                                        iconAnchor: [30, 30],
                                        popupAnchor: [0, -30]
                                    });

                                    return (
                                        <Marker
                                            key={report.id}
                                            position={[report.latitude, report.longitude]}
                                            icon={customIcon}
                                        >
                                            <Popup>
                                                <div style={{ minWidth: '200px' }}>
                                                    <h3 style={{
                                                        margin: '0 0 8px 0',
                                                        color: '#123524',
                                                        fontSize: '16px',
                                                        fontWeight: 'bold'
                                                    }}>
                                                        {report.pollution_type || 'Pollution Report'}
                                                    </h3>
                                                    <p style={{
                                                        margin: '0 0 8px 0',
                                                        color: '#555',
                                                        fontSize: '14px',
                                                        lineHeight: '1.4'
                                                    }}>
                                                        {report.description}
                                                    </p>
                                                    <small style={{ color: '#888', fontSize: '12px' }}>
                                                        {new Date(report.created_at).toLocaleDateString()}
                                                    </small>
                                                </div>
                                            </Popup>
                                        </Marker>
                                    );
                                })}
                            </MapContainer>
                        </div>
                    </div>
                    <div
                        className="flex-[0_0_40%] h-full overflow-y-auto rounded-2xl p-8 shadow-2xl border-2 custom-scrollbar"
                        style={{
                            backgroundColor: ACTIVE_BG,
                            borderColor: ACCENT
                        }}
                    >
                        <h2
                            className="text-3xl font-bold mb-6 border-b-2 pb-4"
                            style={{ borderColor: ACCENT, color: TEXT_LIGHT }}
                        >
                            All Reports
                        </h2>

                        {reports.length === 0 ? (
                            <div className="text-center py-12 text-lg opacity-70">
                                No reports available
                            </div>
                        ) : (
                            <div className="flex flex-col gap-4">
                                {reports.map((report, index) => (
                                    <div
                                        key={report.id}
                                        className="rounded-xl p-5 transition-all duration-300 cursor-pointer shadow-md hover:transform hover:-translate-y-1"
                                        style={{
                                            backgroundColor: BG_DARK,
                                            border: `1px solid ${ACCENT}`
                                        }}
                                    >
                                        <img
                                            src={
                                                supabase.storage
                                                    .from("jani-images")
                                                    .getPublicUrl(report.public_image_url)
                                                    .data.publicUrl
                                            }
                                            alt="Report"
                                            className="rounded-lg mb-3"
                                        />
                                        <div className="flex justify-between items-start mb-3">
                                            <span
                                                className="text-sm font-bold px-3 py-1 rounded-md"
                                                style={{ backgroundColor: ACCENT, color: BG_DARK }}
                                            >
                                                Report #{index + 1}
                                            </span>
                                            {report.pollution_type && (
                                                <span
                                                    className="text-xs font-medium px-3 py-1 rounded-md border"
                                                    style={{ borderColor: TEXT_LIGHT, color: TEXT_LIGHT }}
                                                >
                                                    {report.pollution_type}
                                                </span>
                                            )}
                                        </div>

                                        <p className="text-[0.95rem] leading-relaxed mb-4 break-words opacity-90">
                                            {report.description}
                                        </p>

                                        <div className="flex gap-4 flex-wrap pt-3 border-t" style={{ borderColor: `${ACCENT}40` }}>
                                            <div className="flex-1 min-w-[120px]">
                                                <div className="text-xs mb-1 uppercase tracking-wider opacity-60">
                                                    Latitude
                                                </div>
                                                <div className="text-sm font-semibold font-mono" style={{ color: ACCENT }}>
                                                    {report.latitude.toFixed(6)}
                                                </div>
                                            </div>
                                            <div className="flex-1 min-w-[120px]">
                                                <div className="text-xs mb-1 uppercase tracking-wider opacity-60">
                                                    Longitude
                                                </div>
                                                <div className="text-sm font-semibold font-mono" style={{ color: ACCENT }}>
                                                    {report.longitude.toFixed(6)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Map;