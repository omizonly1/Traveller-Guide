"use client";

import React, { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useReactToPrint } from 'react-to-print';
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';
import type { PassengerDto } from '@repo/types';

interface IDCardGeneratorProps {
    passengers: PassengerDto[];
}

export default function IDCardGenerator({ passengers }: IDCardGeneratorProps) {
    const componentRef = useRef<HTMLDivElement>(null);

    const handlePrint = useReactToPrint({
        contentRef: componentRef as any,
        documentTitle: 'Umrah_ID_Cards',
    });
    if (passengers.length === 0) {
        return <p className="text-sm text-gray-500">No passengers to generate cards for.</p>;
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-end">
                <Button onClick={() => handlePrint()} className="flex items-center gap-2">
                    <Printer size={16} /> Print ID Cards
                </Button>
            </div>

            {/* Hidden printable area */}
            <div className="hidden">
                <div ref={componentRef} className="p-8">
                    <div className="grid grid-cols-2 gap-4">
                        {passengers.map((pax) => (
                            <div
                                key={pax.id}
                                className="border-2 border-black rounded-lg p-4 flex flex-col items-center justify-between"
                                style={{ width: '3.375in', height: '2.125in' }} // Standard ID card size Landscape
                            >
                                <div className="text-center space-y-1 w-full border-b border-black pb-2">
                                    <h3 className="font-bold text-lg">UMRAH ID 2026</h3>
                                    <p className="font-semibold">{pax.firstName} {pax.lastName}</p>
                                    <p className="text-xs">PPT: {pax.passportNo}</p>
                                </div>

                                <div className="flex justify-between w-full pt-2">
                                    <div className="text-xs space-y-1 w-3/5">
                                        <p className="font-bold">Al Goni Tours & Travels</p>
                                        <p>Guide: +966 50 123 4567</p>
                                        {/* The hotel data would be populated deeply in a real query */}
                                        <p>Hotel: Assigned upon arrival</p>
                                    </div>
                                    <div className="w-2/5 flex justify-end items-center">
                                        <QRCodeSVG
                                            value={`UMRAH-QR:${pax.id}`}
                                            size={64}
                                            level="L"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
