import QRCode from 'react-qr-code';

export function formatDateTime(date) {
    return date.toLocaleString('en-US', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).replace(',', '');
  }


export function GenerateQRCode(endpoint) {
    return (
      <QRCode
          value={endpoint}
          size={256}
          style={{ 
            height: "auto", 
            maxWidth: "100%", 
            width: "100%",
            borderRadius: '10px' // makes the QR code itself curvy
          }}
          viewBox={`0 0 300 300`}
          level={'H'}
          bgColor="transparent"
          fgColor="#FFFFFF"
      />
  );
}