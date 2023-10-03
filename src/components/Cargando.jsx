"use client"
import Spinner from 'react-bootstrap/Spinner';
export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <Spinner animation="grow" variant="success" />
  );
}
