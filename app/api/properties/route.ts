import { NextRequest, NextResponse } from 'next/server';
import { PROPERTIES, Property } from '@/lib/properties';

// In-memory property cache for demo/server runtime
let currentProperties: Property[] = [...PROPERTIES];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status');
  const type = searchParams.get('type');
  const slug = searchParams.get('slug');

  let list = currentProperties;

  if (slug) {
    const single = list.find((p) => p.slug === slug);
    if (!single) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }
    return NextResponse.json(single);
  }

  if (status && status !== 'All') {
    list = list.filter((p) => p.status === status);
  }

  if (type && type !== 'All') {
    list = list.filter((p) => p.type === type);
  }

  return NextResponse.json({
    count: list.length,
    properties: list,
  });
}

export async function POST(req: NextRequest) {
  try {
    const newProperty: Property = await req.json();

    if (!newProperty.title || !newProperty.price) {
      return NextResponse.json(
        { error: 'Missing required property fields (title, price)' },
        { status: 400 }
      );
    }

    if (!newProperty.id) {
      newProperty.id = `prop-${Date.now()}`;
    }

    if (!newProperty.slug) {
      newProperty.slug = newProperty.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
    }

    currentProperties = [newProperty, ...currentProperties];

    return NextResponse.json({
      success: true,
      message: 'Property created successfully',
      property: newProperty,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Invalid request payload';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const updatedProperty: Property = await req.json();

    const index = currentProperties.findIndex((p) => p.id === updatedProperty.id);
    if (index === -1) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }

    currentProperties[index] = { ...currentProperties[index], ...updatedProperty };

    return NextResponse.json({
      success: true,
      message: 'Property updated successfully',
      property: currentProperties[index],
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Invalid request payload';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Missing property id' }, { status: 400 });
  }

  currentProperties = currentProperties.filter((p) => p.id !== id);

  return NextResponse.json({
    success: true,
    message: 'Property deleted successfully',
  });
}
