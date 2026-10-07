import { VentureData } from '../types';

/**
 * Generate a valid, authentic PDF-1.4 official investment dossier for the venture
 * and trigger immediate browser download. Pure TypeScript — zero external dependencies.
 */
export function generateAndDownloadDossierPdf(venture: VentureData): void {
  const title = (venture.title || 'SLN VENTURE').toUpperCase();
  const location = venture.location || 'Prime Growth Corridor';
  const rera = venture.reraNumber || 'Approved Layout';
  const totalPlots = venture.totalPlots || '175 Plots';
  const roadWidth = venture.roadWidth || '40 & 50 Feet';
  const phone = venture.contact?.phone || '+91 98480 12345';
  const email = venture.contact?.email || 'invest@slngroup.in';
  const year = new Date().getFullYear();
  const dateStr = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  // Clean strings for PDF Text (escape parentheses and backslashes)
  const esc = (str: string) => str.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');

  // Stream content commands (PostScript-like PDF instructions)
  const contentStream = [
    // Header Luxury Dark Banner
    '0.027 0.075 0.169 rg', // #07132B
    '0 700 612 92 re',
    'f',

    // Gold accent line under header
    '0.772 0.659 0.502 RG', // #C5A880
    '3 w',
    '0 700 m 612 700 l S',

    // Header Text
    'BT',
    '/F2 10 Tf',
    '0.772 0.659 0.502 rg',
    '45 760 Td',
    '(SLN MARKETING PVT LTD  |  PRIVATE INVESTMENT DOSSIER) Tj',
    'ET',

    'BT',
    '/F2 22 Tf',
    '1 1 1 rg',
    '45 725 Td',
    `(${esc(title)}) Tj`,
    'ET',

    'BT',
    '/F1 11 Tf',
    '0.85 0.85 0.85 rg',
    '45 708 Td',
    `(${esc(location)}  -  OFFICIAL ARCHITECTURAL & CADASTRAL BLUEPRINT KIT) Tj`,
    'ET',

    // Decorative Watermark Frame
    '0.92 0.90 0.86 RG',
    '1 w',
    '40 60 532 620 re S',
    '0.772 0.659 0.502 RG',
    '0.5 w',
    '43 63 526 614 re S',

    // Document Verification Section
    'BT',
    '/F2 13 Tf',
    '0.027 0.075 0.169 rg',
    '60 645 Td',
    '(EXECUTIVE SUMMARY & REGULATORY CERTIFICATIONS) Tj',
    'ET',

    '0.772 0.659 0.502 RG',
    '1.5 w',
    '60 638 m 260 638 l S',

    // Specifications Grid
    'BT',
    '/F1 10 Tf',
    '0.2 0.2 0.2 rg',
    '60 615 Td',
    '(RERA Registration No:) Tj',
    '180 0 Td',
    `/F2 10 Tf (${esc(rera)}) Tj`,
    'ET',

    'BT',
    '/F1 10 Tf',
    '0.2 0.2 0.2 rg',
    '60 595 Td',
    '(Total Plotted Enclave:) Tj',
    '180 0 Td',
    `/F2 10 Tf (${esc(totalPlots)}) Tj`,
    'ET',

    'BT',
    '/F1 10 Tf',
    '0.2 0.2 0.2 rg',
    '60 575 Td',
    '(Avenue Road Network:) Tj',
    '180 0 Td',
    `/F2 10 Tf (${esc(roadWidth)} Master Blacktop Roads) Tj`,
    'ET',

    'BT',
    '/F1 10 Tf',
    '0.2 0.2 0.2 rg',
    '60 555 Td',
    '(Title Verification:) Tj',
    '180 0 Td',
    '/F2 10 Tf (100% Clear Title - Immediate Spot Registration) Tj',
    'ET',

    'BT',
    '/F1 10 Tf',
    '0.2 0.2 0.2 rg',
    '60 535 Td',
    '(Statutory Survey Gazette:) Tj',
    '180 0 Td',
    '/F2 10 Tf (Sanctioned Layout Plan Verified) Tj',
    'ET',

    // Strategic Investment Highlights Box
    '0.96 0.95 0.92 rg',
    '60 380 492 135 re f',
    '0.772 0.659 0.502 RG',
    '1 w',
    '60 380 492 135 re S',

    'BT',
    '/F2 12 Tf',
    '0.027 0.075 0.169 rg',
    '75 492 Td',
    '(STRATEGIC INVESTMENT THESIS & INFRASTRUCTURE GUARANTEE) Tj',
    'ET',

    'BT',
    '/F1 9.5 Tf',
    '0.25 0.25 0.25 rg',
    '75 468 Td',
    '(* Underground electrical cabling, high-pressure water conduits, and drainage lines.) Tj',
    '0 -18 Td',
    '(* 24/7 Gated security perimeter, RFID access barriers, and surveillance nodes.) Tj',
    '0 -18 Td',
    '(* High-capital growth corridor with strategic highway connectivity and transit links.) Tj',
    '0 -18 Td',
    '(* Immediate spot deed execution with complete legal documentation certainty.) Tj',
    'ET',

    // Official Verification Seal & Desk Box
    'BT',
    '/F2 11 Tf',
    '0.027 0.075 0.169 rg',
    '60 340 Td',
    '(INVESTOR RELATIONS & SITE DESK) Tj',
    'ET',

    'BT',
    '/F1 9.5 Tf',
    '0.3 0.3 0.3 rg',
    '60 320 Td',
    `(${esc(venture.address || location)}) Tj`,
    '0 -15 Td',
    `(Direct VIP Sales Desk: ${esc(phone)}  |  Email: ${esc(email)}) Tj`,
    '0 -15 Td',
    '(Website: https://slngroup.in  |  Official Portal: https://cms.slnmplapp.com) Tj',
    'ET',

    // Cadastral Verification Stamp Box
    '0.027 0.075 0.169 RG',
    '2 w',
    '60 170 492 90 re S',
    '0.772 0.659 0.502 RG',
    '0.8 w',
    '64 174 484 82 re S',

    'BT',
    '/F2 11 Tf',
    '0.027 0.075 0.169 rg',
    '80 230 Td',
    '(OFFICIAL CADASTRAL BLUEPRINT REGISTRATION STAMP) Tj',
    'ET',

    'BT',
    '/F1 9 Tf',
    '0.3 0.3 0.3 rg',
    '80 210 Td',
    `([CERTIFIED COPY] Valid for official investor allocation - Edition ${year} - Issued on ${dateStr}) Tj`,
    '0 -14 Td',
    '(This digital dossier is issued under the authority of SLN Marketing Pvt Ltd.) Tj',
    'ET',

    // Footer
    'BT',
    '/F1 8 Tf',
    '0.5 0.5 0.5 rg',
    '60 40 Td',
    `(SLN GROUP (c) ${year}  |  CONFIDENTIAL & PROPRIETARY  |  ALL RIGHTS RESERVED) Tj`,
    'ET',
  ].join('\n');

  // Build standard PDF 1.4 Object Graph
  const streamLen = contentStream.length;

  const pdf = [
    '%PDF-1.4',
    '%âãÏÓ',
    '1 0 obj',
    '<< /Type /Catalog /Pages 2 0 R >>',
    'endobj',
    '2 0 obj',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    'endobj',
    '3 0 obj',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>',
    'endobj',
    '4 0 obj',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
    'endobj',
    '5 0 obj',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>',
    'endobj',
    '6 0 obj',
    '<< ' + '/Length ' + streamLen + ' >>',
    'stream',
    contentStream,
    'endstream',
    'endobj',
    'xref',
    '0 7',
    '0000000000 65535 f ',
    '0000000015 00000 n ',
    '0000000068 00000 n ',
    '0000000125 00000 n ',
    '0000000257 00000 n ',
    '0000000325 00000 n ',
    '0000000398 00000 n ',
    'trailer',
    '<< ' + '/Size 7 /Root 1 0 R >>',
    'startxref',
    String(470 + streamLen),
    '%%EOF',
  ].join('\n');

  // Convert to Blob and trigger immediate browser download
  const blob = new Blob([pdf], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const cleanName = (venture.title || 'sln-venture')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  const fileName = `${cleanName}-official-investment-dossier.pdf`;

  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.target = '_blank';
  link.rel = 'noopener,noreferrer';
  document.body.appendChild(link);
  link.click();

  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 1500);
}
